import { StudioHeader } from "@/components/studio/ui";
import { AppearanceForm } from "@/components/admin/appearance-form";
import { getSiteSettings } from "@/lib/site-settings";

export const metadata = { title: "Site" };

export default async function AdminSitePage() {
  const settings = await getSiteSettings();
  return (
    <div className="flex flex-col gap-8">
      <StudioHeader eyebrow="Settings" title="Site">
        Availability, headline and palette. Changes go live instantly, with no redeploy.
      </StudioHeader>
      <AppearanceForm settings={settings} />
    </div>
  );
}
