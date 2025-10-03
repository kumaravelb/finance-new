import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowDownToLine, ArrowUpFromLine, CreditCard } from "lucide-react";

const wallets = [
  {
    id: 1,
    name: "Main Wallet",
    balance: 45231.89,
    currency: "USD",
    type: "primary",
    lastActivity: "2 hours ago"
  },
  {
    id: 2,
    name: "Savings Account",
    balance: 18500.00,
    currency: "USD",
    type: "savings",
    lastActivity: "1 day ago"
  },
  {
    id: 3,
    name: "Crypto Wallet",
    balance: 6200.50,
    currency: "USD",
    type: "crypto",
    lastActivity: "5 hours ago"
  },
];

export default function Wallet() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Wallet</h1>
          <p className="text-muted-foreground">Manage your accounts and balances.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <ArrowDownToLine className="h-4 w-4" />
            Deposit
          </Button>
          <Button className="gap-2">
            <ArrowUpFromLine className="h-4 w-4" />
            Withdraw
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {wallets.map((wallet) => (
          <Card key={wallet.id} className="bg-gradient-card border-primary/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{wallet.name}</CardTitle>
                <CreditCard className="h-5 w-5 text-primary" />
              </div>
              <CardDescription>Last activity: {wallet.lastActivity}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-3xl font-bold">
                  ${wallet.balance.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground uppercase">
                  {wallet.currency}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common wallet operations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-3">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <ArrowUpFromLine className="h-5 w-5" />
              <span>Transfer Funds</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <CreditCard className="h-5 w-5" />
              <span>Add Payment Method</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <ArrowDownToLine className="h-5 w-5" />
              <span>Request Payment</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
