import { Metadata } from "next";
import EventsClient from "./EventsClient";

export const metadata: Metadata = {
  title: "Events | SRMIST Alumni Portal",
  description: "Stay updated with upcoming SRMIST Ramapuram alumni events.",
};

export default function EventsPage() {
  return <EventsClient />;
}
