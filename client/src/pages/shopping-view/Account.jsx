import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import banner2 from "../../assets/banner2.jpg";
import Orders from "@/components/shopping-view/Orders";
import Address from "@/components/shopping-view/Address";

function ShoppingAccount() {
  return (
    <div className="flex flex-col ">
      <div className="relative h-[350px] w-full overflow-hidden">
        <img
          src={banner2}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-8 p-8">
        <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
          <Tabs defaultValues="orders">
            <TabsList>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
            </TabsList>
            <TabsContent value="orders">
              <Orders />
            </TabsContent>
            <TabsContent value="address">
              <Address />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default ShoppingAccount;
