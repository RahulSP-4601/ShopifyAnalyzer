import { redirect } from "next/navigation";
import { getUserWithMarketplaces } from "@/lib/auth/session";
import { checkSubscription } from "@/lib/auth/subscription";
import { ChatContainer } from "@/components/chat";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { ChatHeader } from "@/components/chat/ChatHeader";

export const runtime = "nodejs";

interface ChatConversationPageProps {
  params: Promise<{ id: string }>;
}

export default async function ChatConversationPage({
  params,
}: ChatConversationPageProps) {
  const user = await getUserWithMarketplaces();

  // If not logged in, redirect to signin
  if (!user) {
    redirect("/signin");
  }

  // Check if user has connected marketplaces
  const connectedMarketplaces = user.marketplaceConns.filter(
    (m) => m.status === "CONNECTED"
  );

  // If no marketplaces connected, redirect to onboarding
  if (connectedMarketplaces.length === 0) {
    redirect("/onboarding/connect");
  }

  // Check for active subscription
  const { hasActiveSubscription } = await checkSubscription();
  if (!hasActiveSubscription) {
    redirect("/onboarding/payment");
  }

  const { id } = await params;

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <ChatSidebar
        userName={user.name ?? ""}
        userEmail={user.email ?? ""}
        connectedMarketplaces={connectedMarketplaces.map((m) => ({
          marketplace: m.marketplace,
          name: m.externalName || m.marketplace,
        }))}
      />

      {/* Main chat area */}
      <div className="flex flex-1 flex-col">
        {/* Header with user profile */}
        <ChatHeader
          userName={user.name ?? ""}
          userEmail={user.email ?? ""}
          marketplaceCount={connectedMarketplaces?.length ?? 0}
        />

        {/* Chat container */}
        <main className="flex-1 overflow-hidden">
          <ChatContainer
            initialConversationId={id}
            storeName={connectedMarketplaces[0]?.externalName || "your store"}
            isConnected={true}
          />
        </main>
      </div>
    </div>
  );
}
