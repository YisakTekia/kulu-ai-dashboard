import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function EditTaskSheet({ open, onOpenChange, task }: any) {
  if (!task) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-[540px]">
        <SheetHeader className="mb-6">
          <SheetTitle>Edit Task {task.id}</SheetTitle>
        </SheetHeader>
        
        <div className="space-y-6">
            <div className="space-y-2">
                <Label>Source Text</Label>
                <Textarea defaultValue={task.sourceText} className="min-h-[100px]" />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Assignee</Label>
                    <Input defaultValue={task.assignee?.name} />
                </div>
                <div className="space-y-2">
                    <Label>Due Date</Label>
                    <Input type="date" defaultValue="2025-10-24" />
                </div>
            </div>
        </div>

        <SheetFooter className="mt-8">
            <Button onClick={() => onOpenChange(false)} className="bg-blue-600 w-full">Save Changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}