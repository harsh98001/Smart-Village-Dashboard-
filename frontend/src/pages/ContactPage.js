import React, { useEffect, useState } from "react";
import { h } from "../utils/h";
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

  useEffect(() => {
    setGrievances(readStoredGrievances());
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

  const submitGrievance = (event) => {
    event.preventDefault();

    const grievanceId = `GR-${String(Date.now()).slice(-8)}`;
    const submission = {
      ...grievanceState,
      id: grievanceId,
      submittedAt: new Date().toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }),
      status: "Filed"
    };

    setGrievances([submission, ...grievances].slice(0, 6));
    pushToast({
      title: "Grievance filed",
      message: `${grievanceId} has been created for ${grievanceState.issueType.toLowerCase()}.`,
      variant: "success"
    });
    setGrievanceState(createEmptyGrievanceState());
    setUploadKey((current) => current + 1);
  };

  return h("div", null, [
    h(PageBanner, { key: "banner", chips: ["Support", "Partnerships", "Programme office", "Citizen grievance desk"] }),
    h("section", { key: "body", className: "contact-page-section" }, [
      h("div", { key: "container", className: "container contact-page-stack" }, [
        h("div", { key: "topGrid", className: "contact-top-grid" }, [
          h("div", { key: "details", className: "premium-card settings-card contact-info-card" }, [
            h("span", { key: "eyebrow", className: "section-eyebrow" }, "Programme Support Desk"),
            h("h3", { key: "title", className: "table-title" }, "Programme contact desk"),
            h("p", { key: "text", className: "section-description" }, "Reach the Smart Village team for collaboration, implementation support, platform walkthroughs, and district onboarding coordination."),
            h("div", { key: "lines", className: "contact-lines contact-detail-list" }, [
              h("span", { key: "mail", className: "contact-detail-pill" }, "support@smartvillage.in"),
              h("span", { key: "phoneOne", className: "contact-detail-pill" }, "+91 9693967173"),
              h("span", { key: "phoneTwo", className: "contact-detail-pill" }, "+91 9508227386"),
              h("span", { key: "office", className: "contact-detail-pill" }, "National Rural Governance Cell, New Delhi")
            ]),
            h("div", { key: "stats", className: "contact-response-grid" }, [
              h("div", { key: "stat1", className: "contact-response-card" }, [
                h("span", { key: "label", className: "contact-response-label" }, "Response desk"),
                h("strong", { key: "value" }, "24x7 citizen support")
              ]),
              h("div", { key: "stat2", className: "contact-response-card" }, [
                h("span", { key: "label", className: "contact-response-label" }, "Escalation"),
                h("strong", { key: "value" }, "District to state routing")
              ])
            ])
          ]),
          h("div", { key: "formCard", className: "premium-card settings-card contact-support-card" }, [
            h("span", { key: "eyebrow", className: "section-eyebrow" }, "Quick Support Message"),
            h("h3", { key: "title", className: "table-title" }, "Send a message"),
            h(
              "form",
              {
                key: "form",
                className: "admin-form-grid",
                onSubmit: submitForm
              },
              [
                h("input", {
                  key: "name",
                  className: "form-control contact-form-field",
                  placeholder: "Name",
                  value: formState.name,
                  onChange: (event) => setFormState({ ...formState, name: event.target.value })
                }),
                h("input", {
                  key: "email",
                  className: "form-control contact-form-field",
                  type: "email",
                  placeholder: "Email",
                  value: formState.email,
                  onChange: (event) => setFormState({ ...formState, email: event.target.value })
                }),
                h("textarea", {
                  key: "message",
                  className: "form-control contact-form-field",
                  rows: 5,
                  placeholder: "How can we help?",
                  value: formState.message,
                  onChange: (event) => setFormState({ ...formState, message: event.target.value })
                }),
                h(
                  "button",
                  {
                    key: "submit",
                    type: "submit",
                    className: "btn btn-smart-primary"
                  },
                  "Send message"
                )
              ]
            )
          ])
        ]),
        h("div", { key: "grievanceSection", className: "premium-card grievance-shell" }, [
          h("div", { key: "grievanceLayout", className: "grievance-layout" }, [
            h("div", { key: "grievanceCopy", className: "grievance-copy-panel" }, [
              h("span", { key: "eyebrow", className: "section-eyebrow" }, "Grievance Redressal System"),
              h("h3", { key: "title", className: "section-heading grievance-title" }, "Report civic issues with location-backed details"),
              h(
                "p",
                { key: "text", className: "section-description grievance-description" },
                "Citizens can report broken pipes, blocked drainage, cracked roads, street light failure, petrol pump shortage, and similar public issues. File the complaint with address details and attach a supporting image when available."
              ),
              h(
                "div",
                { key: "chips", className: "grievance-chip-list" },
                issueCategories.map((category) =>
                  h("span", { key: category, className: "grievance-chip" }, category)
                )
              ),
              h("div", { key: "steps", className: "grievance-step-list" }, [
                h("div", { key: "step1", className: "grievance-step-card" }, [
                  h("span", { key: "step", className: "grievance-step-index" }, "01"),
                  h("div", { key: "copy", className: "grievance-step-copy" }, [
                    h("strong", { key: "title" }, "Citizen filing"),
                    h("span", { key: "text" }, "Name, phone, address, pincode, issue type, and evidence image.")
                  ])
                ]),
                h("div", { key: "step2", className: "grievance-step-card" }, [
                  h("span", { key: "step", className: "grievance-step-index" }, "02"),
                  h("div", { key: "copy", className: "grievance-step-copy" }, [
                    h("strong", { key: "title" }, "Verification flow"),
                    h("span", { key: "text" }, "The issue is routed to the district team for validation and assignment.")
                  ])
                ]),
                h("div", { key: "step3", className: "grievance-step-card" }, [
                  h("span", { key: "step", className: "grievance-step-index" }, "03"),
                  h("div", { key: "copy", className: "grievance-step-copy" }, [
                    h("strong", { key: "title" }, "Action tracking"),
                    h("span", { key: "text" }, "Complaint IDs can be reviewed and escalated inside the governance workflow.")
                  ])
                ])
              ]),
              h("div", { key: "recent", className: "grievance-recent-card" }, [
                h("strong", { key: "title", className: "table-title" }, "Recent grievance drafts"),
                grievances.length
                  ? h(
                      "div",
                      { key: "list", className: "grievance-recent-list" },
                      grievances.slice(0, 3).map((item) =>
                        h("div", { key: item.id, className: "grievance-recent-item" }, [
                          h("div", { key: "head", className: "grievance-recent-head" }, [
                            h("strong", { key: "type" }, item.issueType),
                            h("span", { key: "status", className: "grievance-recent-status" }, item.status)
                          ]),
                          h("span", { key: "meta", className: "grievance-recent-meta" }, `${item.name} - ${item.pincode}`),
                          h("span", { key: "id", className: "grievance-recent-meta" }, `${item.id} - ${item.submittedAt}`)
                        ])
                      )
                    )
                  : h(
                      "p",
                      { key: "empty", className: "section-description grievance-empty-note" },
                      "No grievance has been filed from this browser yet."
                    )
              ])
            ]),
            h("div", { key: "grievanceFormCard", className: "grievance-form-panel" }, [
              h("span", { key: "eyebrow", className: "section-eyebrow" }, "Citizen Complaint Form"),
              h("h3", { key: "title", className: "table-title" }, "Register a grievance"),
              h(
                "form",
                {
                  key: "form",
                  className: "grievance-form-grid",
                  onSubmit: submitGrievance
                },
                [
                  h("div", { key: "issueWrap", className: "grievance-field-wrap grievance-field-wide" }, [
                    h("label", { key: "label", className: "admin-input-label" }, "Issue category"),
                    h(
                      "select",
                      {
                        key: "select",
                        className: "form-select contact-form-field",
                        value: grievanceState.issueType,
                        onChange: (event) =>
                          setGrievanceState({ ...grievanceState, issueType: event.target.value })
                      },
                      issueCategories.map((category) =>
                        h("option", { key: category, value: category }, category)
                      )
                    )
                  ]),
                  h("div", { key: "nameWrap", className: "grievance-field-wrap" }, [
                    h("label", { key: "label", className: "admin-input-label" }, "Citizen name"),
                    h("input", {
                      key: "name",
                      className: "form-control contact-form-field",
                      placeholder: "Enter full name",
                      required: true,
                      value: grievanceState.name,
                      onChange: (event) =>
                        setGrievanceState({ ...grievanceState, name: event.target.value })
                    })
                  ]),
                  h("div", { key: "phoneWrap", className: "grievance-field-wrap" }, [
                    h("label", { key: "label", className: "admin-input-label" }, "Mobile number"),
                    h("input", {
                      key: "phone",
                      className: "form-control contact-form-field",
                      type: "tel",
                      placeholder: "10-digit number",
                      required: true,
                      maxLength: 10,
                      value: grievanceState.phone,
                      onChange: (event) =>
                        setGrievanceState({ ...grievanceState, phone: event.target.value })
                    })
                  ]),
                  h("div", { key: "addressWrap", className: "grievance-field-wrap grievance-field-wide" }, [
                    h("label", { key: "label", className: "admin-input-label" }, "Address"),
                    h("textarea", {
                      key: "address",
                      className: "form-control contact-form-field grievance-address-field",
                      rows: 3,
                      placeholder: "House / street / landmark / locality",
                      required: true,
                      value: grievanceState.address,
                      onChange: (event) =>
                        setGrievanceState({ ...grievanceState, address: event.target.value })
                    })
                  ]),
                  h("div", { key: "pincodeWrap", className: "grievance-field-wrap" }, [
                    h("label", { key: "label", className: "admin-input-label" }, "Pincode"),
                    h("input", {
                      key: "pincode",
                      className: "form-control contact-form-field",
                      placeholder: "6-digit pincode",
                      required: true,
                      maxLength: 6,
                      value: grievanceState.pincode,
                      onChange: (event) =>
                        setGrievanceState({ ...grievanceState, pincode: event.target.value })
                    })
                  ]),
                  h("div", { key: "descriptionWrap", className: "grievance-field-wrap grievance-field-wide" }, [
                    h("label", { key: "label", className: "admin-input-label" }, "Issue description"),
                    h("textarea", {
                      key: "description",
                      className: "form-control contact-form-field grievance-description-field",
                      rows: 4,
                      placeholder: "Describe the issue clearly so the district team can act quickly.",
                      required: true,
                      value: grievanceState.description,
                      onChange: (event) =>
                        setGrievanceState({ ...grievanceState, description: event.target.value })
                    })
                  ]),
                  h("div", { key: "uploadWrap", className: "grievance-field-wrap grievance-field-wide" }, [
                    h("label", { key: "label", className: "admin-input-label" }, "Supporting image (optional)"),
                    h("div", { key: "uploadCard", className: "grievance-upload-card" }, [
                      h("input", {
                        key: `file-${uploadKey}`,
                        className: "form-control contact-form-field grievance-file-input",
                        type: "file",
                        accept: "image/*",
                        onChange: (event) =>
                          setGrievanceState({
                            ...grievanceState,
                            attachmentName: event.target.files?.[0]?.name || ""
                          })
                      }),
                      h(
                        "span",
                        { key: "meta", className: "grievance-upload-meta" },
                        grievanceState.attachmentName
                          ? `Attached: ${grievanceState.attachmentName}`
                          : "Attach a site image if possible to support verification."
                      )
                    ])
                  ]),
                  h(
                    "button",
                    {
                      key: "submit",
                      type: "submit",
                      className: "btn btn-smart-primary grievance-submit-button grievance-field-wide"
                    },
                    "File grievance"
                  )
                ]
              )
            ])
          ])
        ])
      ])
    ])
  ]);
};

export default ContactPage;
