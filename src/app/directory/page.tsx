import { Metadata } from "next";
import DirectoryClient from "./DirectoryClient";

export const metadata: Metadata = {
  title: "Alumni Directory | SRMIST Alumni Portal",
  description: "Browse and connect with SRMIST Ramapuram alumni.",
};

export default function DirectoryPage() {
  return <DirectoryClient />;
}
