"use server";

import HeroCom from "@/app/components/HeroCom";
import { AllOrderAction } from "@/app/actions/AdminAction";
import ManagePanelButtons from "@/app/components/buttons/ManagePanelButtons";

const ManagePanel = async () => {
  const res = await AllOrderAction();

  return (
    <div>
      <HeroCom title="Manage Panel" />
      <div className="overflow-x-auto p-6 mt-6">
        <table className="min-w-full border border-gray-300 text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-3">ID</th>
              <th className="border p-3">User</th>
              <th className="border p-3">Total</th>
              <th className="border p-3">Status</th>
              <th className="border p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {res?.success && res?.orders?.length > 0 ? (
              res.orders.map((order) => (
                <tr key={order.id} className="border hover:bg-gray-50">
                  <td className="p-3">{order.id}</td>
                  <td className="p-3">{order.user?.name || "Unknown"}</td>
                  <td className="p-3">{order.total_price || 0} EGP</td>
                  <td className="p-3 capitalize">{order.status}</td>
                  <td className="p-3">
                    <ManagePanelButtons id={order.id} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagePanel;
