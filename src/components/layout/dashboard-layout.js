import React from "react";
import { DashboardHeader } from "../header";

export default function DashboardLayout({ children }) {
	return (
		<>
			<DashboardHeader />
			<main>{children}</main>
		</>
	);
}
