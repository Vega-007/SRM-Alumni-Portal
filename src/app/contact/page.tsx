import { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact & Profile Update | SRMIST Alumni Portal",
  description: "Get in touch or update your profile on the SRMIST Ramapuram Alumni Portal.",
};

export default function ContactPage() {
  return <ContactClient />;
}
