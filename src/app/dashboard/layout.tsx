import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LayoutDashboard, Zap, FileText, CreditCard, Settings, LogOut, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { signOut } from "next-auth/react";

const navItems = [
    { label: "Dashboard", icon: LayoutDashboard,  href: "/dashboard"},
    { label: "Flows"    , icon: Zap            ,  href: "/dashboard/flows" },
    { label: "Templates", icon: FileText       ,  href: "/dashboard/templates" },
    { label: "Billing"  , icon: CreditCard     ,  href: "/dashboard/billing" },
    { label: "Settings" , icon: Settings       ,  href: "/dashboard/settings" },
    { label: "Logout"   , icon: LogOut         ,  href: "/logout" },
]

export default async function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const session = await auth();
    if (!session?.user) {
        redirect("/login");
    }

    await connectToDatabase();
    const user = await User.findOne({ email: session.user.email });
    const credits = user?.credits || 0;

    return (
        <div className="flex min-h-screen w-full bg-gray-100">
            <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 border-r bg-card/50 flex-col gap-4 p-4 backdrop-blur-xl sm:flex">
                <div className="flex h-16 items-center border-b px-6 ">
                    <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground ">
                            <Zap className="w-5 h-5" />
                        </div>
                        <span className="text-lg tracking-tight">AutoFlow AI</span>
                    </Link>

                </div>
                <nav className="flex-1 space-y-1 py-4 px-3">
                    {navItems.map(
                        (item) => (
                            <Link key={item.href} href={item.href} className="group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all">
                                <item.icon className="h-4 w-4 transition-colors group-hover:text-primary" />
                                <span className="text-sm tracking-tight">{item.label}</span>
                            </Link>
                        )
                    )}
                </nav>
                <div className="border-t p-4 ">
                    <form action={
                        async() => {
                            'use server';
                            await signOut()
                    }}>
                        <Button variant={"ghost"} className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive" type="submit">
                            <LogOut className="w-4 h-4"/>
                            logout
                        </Button>

                    </form>
                </div>
            </aside>

            <div className="flex flex-1 flex-col sm:pl-64">
                <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-md sm:px-6">
                    {/* Mobile Menu */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant={"ghost"} size={"icon"} className="sm:hidden">
                                <Menu className="h-5 w-5"/>
                                <span className="sr-only">Toggle Menu</span>

                            </Button>
                        </SheetTrigger>

                        <SheetContent side="left" className="w-64 p-0">
                            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                            <div className="flex h-16 items-center border-b px-6">
                                <Link href={'/dashbord'} className="flex items-center gap-2 font-semibold ">
                                <Zap className="h-5 w-5 text-primary " />
                                <span>AutoFlow ai</span>
                                </Link>
                            </div>
                            <nav className="space-y-1 px-3 py-4">
                                { navItems.map(
                                    (item)=>(
                                        <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
                                            <item.icon className="h-4 w-4" />
                                            <span className="text-sm tracking-tight">{item.label}</span>
                                        </Link>
                                    )
                                )}
                            </nav>
                        </SheetContent>
                    </Sheet>

                    <div className=" flex flex-1 items-center justify-between ">
                        <h1 className="text-sm font-medium text-muted-foreground sm:text-base">Dashboard</h1>
                        <div className="flex items-center gap-4">
                            <Link href="/dashboard/billing/usage" className="hidden items-center gap-2 border justify-center sm:flex  rounded-full bg-card px-3 py-1 font-medium text-xs hover:bg-accent transition-colors md:flex">
                            <Zap className="h-3 w-3 text-primary"/>
                            <span>{credits} Credits</span>
                            </Link>
                            <ModeToggel />
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant={"ghost"} size={"icon"} className=" rounded-full ring-offset-background transition-all hover:ring-2 hover:ring-primary/20">
                                        <Avatar className=" h-8 w-8">
                                            <AvatarImage src={session.user.image || ""} alt={session.user.name || undefined} />
                                            <AvatarFallback>{session.user.name?.charAt(0) || "U"}</AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className=" w-56 " align="end">
                                    <DropdownMenuLabel className=" font-normal">
                                        <div className="flex flex-col space-y-1 ">
                                            <p className="text-sm font-medium leading-none">{session.user.name}</p>
                                            <p className="text-xs text-muted-foreground leading-none">{session.user.email}</p>
                                
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link href="/dashboard/settings" className=" w-full">Settings</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem >Support</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <form action={
                                        async() => {
                                            'use server';
                                            await signOut()
                                    }}>
                                        <DropdownMenuItem asChild>
                                            <Button className="w-full text-left text-destructive">
                                                Logout
                                            </Button>
                                        </DropdownMenuItem>

                                    </form>
                                </DropdownMenuContent>

                            </DropdownMenu>
                        </div>
                    </div>
                </header>
                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    <div className="mx-auto max-w-7xl ">
                        {children}
                    </div>
                </main>

            </div>
            
        </div>
    );
}