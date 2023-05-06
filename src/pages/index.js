import { Dashboard } from "@/components/pages";
import { DashboardLayout } from "@/components/layout";

export default function DashboardPage() {
	return (
		<>
			<Dashboard />
		</>
	);
}

DashboardPage.getLayout = function getLayout(page) {
	return <DashboardLayout>{page}</DashboardLayout>;
};
