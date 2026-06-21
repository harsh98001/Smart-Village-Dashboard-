import React, { useEffect, useState } from "react";
import apiClient from "../api/client";
import { useToast } from "../context/ToastContext";
import PageBanner from "../components/layout/PageBanner";

const grievanceStorageKey = "smartVillageGrievanceDrafts";

const issueCategories = [
  "Broken pipes",
  "Blocked drainage",
  "Road potholes",
  "Street light failure",
  "Petrol pump shortage",
  "Water contamination",
  "Waste overflow",
  "Public facility damage"
];

const createEmptyGrievanceState = () => ({
  issueType: issueCategories[0],
  name: "",
  phone: "",
  address: "",
  pincode: "",
  description: "",
  attachmentName: ""
});

const readStoredGrievances = () => {
  try {
    const savedValue = localStorage.getItem(grievanceStorageKey);
    const parsed = JSON.parse(savedValue || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch (_error) {
    return [];
  }
};

const ContactPage = () => {
  const { pushToast } = useToast();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [grievanceState, setGrievanceState] = useState(createEmptyGrievanceState());
  const [grievances, setGrievances] = useState([]);
  const [uploadKey, setUploadKey] = useState(0);
  const [isSubmittingGrievance, setIsSubmittingGrievance] = useState(false);

  useEffect(() => {
    let ignore = false;

    const loadGrievances = async () => {
      try {
        const response = await apiClient.get("/grievances");
        if (!ignore) {
          setGrievances(response.data?.grievances || []);
        }
      } catch (_error) {
        if (!ignore) {
          setGrievances(readStoredGrievances());
        }
      }
    };

    loadGrievances();

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    localStorage.setItem(grievanceStorageKey, JSON.stringify(grievances));
  }, [grievances]);

  const submitForm = (event) => {
    event.preventDefault();
    pushToast({
      title: "Message received",
      message: "The contact request has been captured in the interface flow.",
      variant: "success"
    });
    setFormState({ name: "", email: "", message: "" });
  };

  const submitGrievance = async (event) => {
    event.preventDefault();
    setIsSubmittingGrievance(true);

    try {
      const response = await apiClient.post("/grievances", grievanceState);
      const submission = response.data?.grievance;

      setGrievances([submission, ...grievances].filter(Boolean).slice(0, 6));
      pushToast({
        title: "Grievance filed",
        message: `${submission.id} has been saved to MongoDB Atlas.`,
        variant: "success"
      });
      setGrievanceState(createEmptyGrievanceState());
      setUploadKey((current) => current + 1);
    } catch (error) {
      pushToast({
        title: "Grievance not saved",
        message: error.response?.data?.message || "Please check the form and try again.",
        variant: "error"
      });
    } finally {
      setIsSubmittingGrievance(false);
    }
  };

  return <div>
  <PageBanner key="banner" chips={["Support", "Partnerships", "Programme office", "Citizen grievance desk"]} />
  <section key="body" className="contact-page-section">
    <div key="container" className="container contact-page-stack">
      <div key="topGrid" className="contact-top-grid">
        <div key="details" className="premium-card settings-card contact-info-card">
          <span key="eyebrow" className="section-eyebrow">Programme Support Desk</span>
          <h3 key="title" className="table-title">Programme contact desk</h3>
          <p key="text" className="section-description">Reach the Smart Village team for collaboration, implementation support, platform walkthroughs, and district onboarding coordination.</p>
          <div key="lines" className="contact-lines contact-detail-list">
            <span key="mail" className="contact-detail-pill">support@smartvillage.in</span>
            <span key="phoneOne" className="contact-detail-pill">+91 9693967173</span>
            <span key="phoneTwo" className="contact-detail-pill">+91 9508227386</span>
            <span key="office" className="contact-detail-pill">National Rural Governance Cell, New Delhi</span>
          </div>
          <div key="stats" className="contact-response-grid">
            <div key="stat1" className="contact-response-card">
              <span key="label" className="contact-response-label">Response desk</span>
              <strong key="value">24x7 citizen support</strong>
            </div>
            <div key="stat2" className="contact-response-card">
              <span key="label" className="contact-response-label">Escalation</span>
              <strong key="value">District to state routing</strong>
            </div>
          </div>
        </div>
        <div key="formCard" className="premium-card settings-card contact-support-card">
          <span key="eyebrow" className="section-eyebrow">Quick Support Message</span>
          <h3 key="title" className="table-title">Send a message</h3>
          <form key="form" className="admin-form-grid" onSubmit={submitForm}>
            <input key="name" className="form-control contact-form-field" placeholder="Name" value={formState.name} onChange={(event) => setFormState({ ...formState, name: event.target.value })} />
            <input key="email" className="form-control contact-form-field" type="email" placeholder="Email" value={formState.email} onChange={(event) => setFormState({ ...formState, email: event.target.value })} />
            <textarea key="message" className="form-control contact-form-field" rows={5} placeholder="How can we help?" value={formState.message} onChange={(event) => setFormState({ ...formState, message: event.target.value })} />
            <button key="submit" type="submit" className="btn btn-smart-primary">Send message</button>
          </form>
        </div>
      </div>
      <div key="grievanceSection" className="premium-card grievance-shell">
        <div key="grievanceLayout" className="grievance-layout">
          <div key="grievanceCopy" className="grievance-copy-panel">
            <span key="eyebrow" className="section-eyebrow">Grievance Redressal System</span>
            <h3 key="title" className="section-heading grievance-title">Report civic issues with location-backed details</h3>
            <p key="text" className="section-description grievance-description">Citizens can report broken pipes, blocked drainage, cracked roads, street light failure, petrol pump shortage, and similar public issues. File the complaint with address details and attach a supporting image when available.</p>
            <div key="chips" className="grievance-chip-list">
              {issueCategories.map((category) =>
                                <span key={category} className="grievance-chip">
                {category}
              </span>
                              )}
            </div>
            <div key="steps" className="grievance-step-list">
              <div key="step1" className="grievance-step-card">
                <span key="step" className="grievance-step-index">01</span>
                <div key="copy" className="grievance-step-copy">
                  <strong key="title">Citizen filing</strong>
                  <span key="text">Name, phone, address, pincode, issue type, and evidence image.</span>
                </div>
              </div>
              <div key="step2" className="grievance-step-card">
                <span key="step" className="grievance-step-index">02</span>
                <div key="copy" className="grievance-step-copy">
                  <strong key="title">Verification flow</strong>
                  <span key="text">The issue is routed to the district team for validation and assignment.</span>
                </div>
              </div>
              <div key="step3" className="grievance-step-card">
                <span key="step" className="grievance-step-index">03</span>
                <div key="copy" className="grievance-step-copy">
                  <strong key="title">Action tracking</strong>
                  <span key="text">Complaint IDs can be reviewed and escalated inside the governance workflow.</span>
                </div>
              </div>
            </div>
            <div key="recent" className="grievance-recent-card">
              <strong key="title" className="table-title">Recent grievance drafts</strong>
              {grievances.length
                                ? <div key="list" className="grievance-recent-list">
                {grievances.slice(0, 3).map((item) =>
                                        <div key={item.id} className="grievance-recent-item">
                  <div key="head" className="grievance-recent-head">
                    <strong key="type">
                      {item.issueType}
                    </strong>
                    <span key="status" className="grievance-recent-status">
                      {item.status}
                    </span>
                  </div>
                  <span key="meta" className="grievance-recent-meta">
                    {`${item.name} - ${item.pincode}`}
                  </span>
                  <span key="id" className="grievance-recent-meta">
                    {`${item.id} - ${new Date(item.submittedAt).toLocaleString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit"
                    })}`}
                  </span>
                </div>
                                      )}
              </div>
                                : <p key="empty" className="section-description grievance-empty-note">No grievance has been filed from this browser yet.</p>}
            </div>
          </div>
          <div key="grievanceFormCard" className="grievance-form-panel">
            <span key="eyebrow" className="section-eyebrow">Citizen Complaint Form</span>
            <h3 key="title" className="table-title">Register a grievance</h3>
            <form key="form" className="grievance-form-grid" onSubmit={submitGrievance}>
              <div key="issueWrap" className="grievance-field-wrap grievance-field-wide">
                <label key="label" className="admin-input-label">Issue category</label>
                <select key="select" className="form-select contact-form-field" value={grievanceState.issueType} onChange={(event) =>
                                          setGrievanceState({ ...grievanceState, issueType: event.target.value })}>
                  {issueCategories.map((category) =>
                                          <option key={category} value={category}>
                    {category}
                  </option>
                                        )}
                </select>
              </div>
              <div key="nameWrap" className="grievance-field-wrap">
                <label key="label" className="admin-input-label">Citizen name</label>
                <input key="name" className="form-control contact-form-field" placeholder="Enter full name" required value={grievanceState.name} onChange={(event) =>
                                        setGrievanceState({ ...grievanceState, name: event.target.value })} />
              </div>
              <div key="phoneWrap" className="grievance-field-wrap">
                <label key="label" className="admin-input-label">Mobile number</label>
                <input key="phone" className="form-control contact-form-field" type="tel" placeholder="10-digit number" required maxLength={10} value={grievanceState.phone} onChange={(event) =>
                                        setGrievanceState({ ...grievanceState, phone: event.target.value })} />
              </div>
              <div key="addressWrap" className="grievance-field-wrap grievance-field-wide">
                <label key="label" className="admin-input-label">Address</label>
                <textarea key="address" className="form-control contact-form-field grievance-address-field" rows={3} placeholder="House / street / landmark / locality" required value={grievanceState.address} onChange={(event) =>
                                        setGrievanceState({ ...grievanceState, address: event.target.value })} />
              </div>
              <div key="pincodeWrap" className="grievance-field-wrap">
                <label key="label" className="admin-input-label">Pincode</label>
                <input key="pincode" className="form-control contact-form-field" placeholder="6-digit pincode" required maxLength={6} value={grievanceState.pincode} onChange={(event) =>
                                        setGrievanceState({ ...grievanceState, pincode: event.target.value })} />
              </div>
              <div key="descriptionWrap" className="grievance-field-wrap grievance-field-wide">
                <label key="label" className="admin-input-label">Issue description</label>
                <textarea key="description" className="form-control contact-form-field grievance-description-field" rows={4} placeholder="Describe the issue clearly so the district team can act quickly." required value={grievanceState.description} onChange={(event) =>
                                        setGrievanceState({ ...grievanceState, description: event.target.value })} />
              </div>
              <div key="uploadWrap" className="grievance-field-wrap grievance-field-wide">
                <label key="label" className="admin-input-label">Supporting image (optional)</label>
                <div key="uploadCard" className="grievance-upload-card">
                  <input key={`file-${uploadKey}`} className="form-control contact-form-field grievance-file-input" type="file" accept="image/*" onChange={(event) =>
                                            setGrievanceState({
                                              ...grievanceState,
                                              attachmentName: event.target.files?.[0]?.name || ""
                                            })} />
                  <span key="meta" className="grievance-upload-meta">
                    {grievanceState.attachmentName
                                              ? `Attached: ${grievanceState.attachmentName}`
                                              : "Attach a site image if possible to support verification."}
                  </span>
                </div>
              </div>
              <button key="submit" type="submit" className="btn btn-smart-primary grievance-submit-button grievance-field-wide" disabled={isSubmittingGrievance}>
                {isSubmittingGrievance ? "Saving grievance..." : "File grievance"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>;
};

export default ContactPage;
