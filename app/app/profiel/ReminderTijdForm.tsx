"use client";

import { useActionState } from "react";
import { Check } from "lucide-react";
import { slaReminderTijdOp } from "@/app/actions/profiel";
import { Button } from "@/components/ui/Button";

interface Props {
  huidigeReminderTijd: string;
}

export function ReminderTijdForm({ huidigeReminderTijd }: Props) {
  const [state, actie, isPending] = useActionState(slaReminderTijdOp, {});

  return (
    <form action={actie} className="space-y-3">
      <div className="flex gap-3 items-center">
        <input
          type="time"
          name="reminder_time"
          defaultValue={huidigeReminderTijd}
          className="flex-1 px-3 py-2.5 rounded-[10px] border-2 border-[#E8E2D8] bg-white text-sm text-[#2D2A26] font-body focus:outline-none focus:border-[#1B7A6E] transition-colors"
        />
        <Button type="submit" loading={isPending} size="sm">
          Opslaan
        </Button>
      </div>
      {state.succes && (
        <p className="text-xs text-[#4CAF7D] font-body flex items-center gap-1">
          <Check className="w-3 h-3" />
          Tijd opgeslagen
        </p>
      )}
      {state.error && (
        <p className="text-xs text-[#C75050] font-body">{state.error}</p>
      )}
    </form>
  );
}
