"use client";

import { useState } from "react";
import { CompanyContactForm } from "./CompanyContactForm";
import { StudentContactForm } from "./StudentContactForm";

function ContactForm() {
  const [userType, setUserType] = useState<"student" | "company">("student");
  return (
    <div>
      <div className="flex justify-stretch w-full">
        <button
          className={`grow flex border-b-4 ${userType === "student" ? "" : "border-muted-foreground/50 text-muted-foreground/50"}`}
          onClick={() => setUserType("student")}
        >
          <p className="grow text-center p-4 font-bold cursor-pointer">
            学生の方
          </p>
        </button>
        <button
          className={`grow flex border-b-4 ${userType === "company" ? "" : "border-muted-foreground/50 text-muted-foreground/50"}`}
          onClick={() => setUserType("company")}
        >
          <p className="grow text-center p-4 font-bold cursor-pointer">
            企業の方
          </p>
        </button>
      </div>
      {userType === "student" ? (
        <StudentContactForm className="p-8 mx-auto max-w-4xl w-full" />
      ) : (
        <CompanyContactForm className="p-8 mx-auto max-w-4xl w-full" />
      )}
    </div>
  );
}

export { ContactForm };
