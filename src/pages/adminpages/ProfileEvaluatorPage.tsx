import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

interface Evaluator {
  id: string;
  first_name: string;
  last_name: string;
  gender: string;
  email: string;
  alternate_email: string;
  phone_number: string;
  alternate_phone_number: string;
  college_name: string;
  designation: string;
  total_experience: string;
  city: string;
  state: string;
  knowledge_domain: string;
  theme_preference_1: string;
  theme_preference_2: string;
  theme_preference_3: string;
  expertise_in_startup_value_chain: string;
  role_interested: string;
  evaluator_status: string;
}

export function ProfileEvaluatorPage() {
  const [evaluator, setEvaluator] = useState<Evaluator | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const authToken = Cookies.get("auth_token1");
    const evaluatorId = localStorage.getItem("evaluator_id");

    if (!authToken || !evaluatorId) {
      setError("You are not authenticated or evaluator ID is missing.");
      setLoading(false);
      return;
    }

    // Send evaluator_id as part of an array in the request body
    axios
      .post(
        `http://localhost/webdev/getevaluator1.php`,
        { evaluator_ids: [evaluatorId] }, // Sending evaluator_id as an array
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${authToken}` },
        }
      )
      .then((response) => {
        // Assuming the API returns an array, and we pick the first element
        const evaluatorData = response.data && response.data[0];
        if (evaluatorData) {
          setEvaluator(evaluatorData);
        } else {
          setError("Evaluator not found.");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch evaluator details");
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Evaluator Profile</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {evaluator && (
        <div>
          <p><strong>ID:</strong> {evaluator.id}</p>
          <p><strong>First Name:</strong> {evaluator.first_name}</p>
          <p><strong>Last Name:</strong> {evaluator.last_name}</p>
          <p><strong>Gender:</strong> {evaluator.gender}</p>
          <p><strong>Email:</strong> {evaluator.email}</p>
          <p><strong>Alternate Email:</strong> {evaluator.alternate_email}</p>
          <p><strong>Phone Number:</strong> {evaluator.phone_number}</p>
          <p><strong>Alternate Phone Number:</strong> {evaluator.alternate_phone_number}</p>
          <p><strong>College Name:</strong> {evaluator.college_name}</p>
          <p><strong>Designation:</strong> {evaluator.designation}</p>
          <p><strong>Total Experience:</strong> {evaluator.total_experience}</p>
          <p><strong>City:</strong> {evaluator.city}</p>
          <p><strong>State:</strong> {evaluator.state}</p>
          <p><strong>Knowledge Domain:</strong> {evaluator.knowledge_domain}</p>
          <p><strong>Theme Preference 1:</strong> {evaluator.theme_preference_1}</p>
          <p><strong>Theme Preference 2:</strong> {evaluator.theme_preference_2}</p>
          <p><strong>Theme Preference 3:</strong> {evaluator.theme_preference_3}</p>
          <p><strong>Expertise in Startup Value Chain:</strong> {evaluator.expertise_in_startup_value_chain}</p>
          <p><strong>Role Interested:</strong> {evaluator.role_interested}</p>
          <p><strong>Status:</strong> {evaluator.evaluator_status}</p>
        </div>
      )}
    </div>
  );
}
