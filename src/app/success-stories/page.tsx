import { Metadata } from "next";
import SuccessStoriesClient from "./SuccessStoriesClient";

export const metadata: Metadata = {
  title: "Success Stories | SRMIST Alumni Portal",
  description: "Read inspiring stories of SRMIST Ramapuram graduates.",
};

export default function SuccessStoriesPage() {
  return <SuccessStoriesClient />;
}
