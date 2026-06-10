import { Metadata } from "next";
import HomeClient from "@/components/HomeClient";

export const metadata: Metadata = {
  title: "Home | SRMIST Alumni Portal",
  description: "Welcome to the official SRMIST Ramapuram Alumni Portal.",
};

export default function Home() {
  return <HomeClient />;
}
