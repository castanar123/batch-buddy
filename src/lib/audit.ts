import { supabase } from "@/integrations/supabase/client";

export const logAuditAction = async (
  action: string,
  module: string,
  details?: string,
  userId?: string
) => {
  try {
    const { error } = await supabase.from("audit_logs").insert({
      action,
      module,
      details,
      user_id: userId,
    });

    if (error) {
      console.error("Failed to log audit action:", error);
    }
  } catch (error) {
    console.error("Audit logging error:", error);
  }
};