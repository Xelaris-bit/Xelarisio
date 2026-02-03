
import * as React from 'react';

interface ResumeSubmissionEmailProps {
  name: string;
  email: string;
}

const ResumeSubmissionEmail: React.FC<Readonly<ResumeSubmissionEmailProps>> = ({ name, email }) => (
  <div>
    <h1>New Resume Submission</h1>
    <p>
      You have received a new resume submission from your website careers page.
    </p>
    <hr />
    <h2>Candidate Details:</h2>
    <ul>
      <li><strong>Name:</strong> {name}</li>
      <li><strong>Email:</strong> {email}</li>
    </ul>
    <hr />
    <p>The candidate's resume is attached to this email.</p>
  </div>
);

export default ResumeSubmissionEmail;
