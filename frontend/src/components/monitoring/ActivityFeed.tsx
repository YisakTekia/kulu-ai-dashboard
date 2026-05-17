import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

const activities = [
  {
    id: 1,
    user: { name: "Abebe Kebede", avatar: "AK" },
    action: "submitted a translation task",
    time: "2 mins ago",
  },
  {
    id: 2,
    user: { name: "Sara M.", avatar: "SM" },
    action: "approved an audio recording",
    time: "15 mins ago",
  },
  {
    id: 3,
    user: { name: "Chala O.", avatar: "CO" },
    action: "flagged a transcription for review",
    time: "3 hours ago",
  },
  {
    id: 4,
    user: { name: "System", avatar: "SYS" },
    action: "New user registered",
    time: "5 hours ago",
  },
];

export function ActivityFeed() {
  return (
    <ScrollArea className="h-[300px]">
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-4 text-sm">
            <Avatar>
              <AvatarFallback>{activity.user.avatar}</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <div className="font-medium">{activity.user.name}</div>
              <div className="text-muted-foreground">{activity.action}</div>
              <div className="text-xs text-muted-foreground">{activity.time}</div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}