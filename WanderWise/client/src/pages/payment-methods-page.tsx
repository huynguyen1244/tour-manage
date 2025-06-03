import { useState } from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  CreditCard,
  Plus,
  MoreHorizontal,
  Trash2,
  Edit3,
  Shield,
  Calendar,
  Building,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const PaymentMethodsPage = () => {
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: "visa",
      lastFour: "4242",
      expiryDate: "12/25",
      cardholderName: "John Doe",
      isDefault: true,
      issuer: "Chase Bank",
    },
    {
      id: 2,
      type: "mastercard",
      lastFour: "8888",
      expiryDate: "03/26",
      cardholderName: "John Doe",
      isDefault: false,
      issuer: "Bank of America",
    },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    billingZip: "",
  });

  const getCardIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "visa":
        return (
          <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
            VISA
          </div>
        );
      case "mastercard":
        return (
          <div className="w-8 h-5 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">
            MC
          </div>
        );
      case "amex":
        return (
          <div className="w-8 h-5 bg-green-600 rounded text-white text-xs flex items-center justify-center font-bold">
            AMEX
          </div>
        );
      default:
        return <CreditCard className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const handleSetDefault = (id: number) => {
    setPaymentMethods((methods) =>
      methods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      }))
    );
  };

  const handleDelete = (id: number) => {
    setPaymentMethods((methods) =>
      methods.filter((method) => method.id !== id)
    );
  };

  const handleAddCard = () => {
    const newCard = {
      id: Date.now(),
      type: "visa", // This would be detected from card number in real implementation
      lastFour: formData.cardNumber.slice(-4),
      expiryDate: formData.expiryDate,
      cardholderName: formData.cardholderName,
      isDefault: paymentMethods.length === 0,
      issuer: "Bank",
    };

    setPaymentMethods([...paymentMethods, newCard]);
    setIsAddDialogOpen(false);
    setFormData({
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardholderName: "",
      billingZip: "",
    });
  };

  return (
    <>
      {" "}
      <Helmet>
        <title>Phương Thức Thanh Toán | TravelTour</title>
        <meta
          name="description"
          content="Quản lý phương thức thanh toán cho việc đặt tour."
        />
      </Helmet>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold font-poppins text-foreground mb-2">
                Phương Thức Thanh Toán
              </h1>
              <p className="text-muted-foreground">
                Quản lý phương thức thanh toán đã lưu để đặt tour nhanh chóng và
                bảo mật.
              </p>
            </div>
            {/* Security Notice */}
            <Card className="mb-6 border-blue-200 bg-blue-50">
              <CardContent className="pt-6">
                <div className="flex items-start">
                  <Shield className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-1">
                      Bảo Mật & Mã Hóa
                    </h3>
                    <p className="text-sm text-blue-800">
                      Thông tin thanh toán của bạn được mã hóa và lưu trữ an
                      toàn. Chúng tôi không lưu trữ toàn bộ số thẻ hoặc mã CVV
                      của bạn.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Payment Methods List */}
            <div className="space-y-4 mb-6">
              {paymentMethods.map((method) => (
                <Card key={method.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {getCardIcon(method.type)}
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">
                              •••• •••• •••• {method.lastFour}
                            </span>
                            {method.isDefault && (
                              <Badge variant="secondary" className="text-xs">
                                Mặc định
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center space-x-3 text-sm text-muted-foreground mt-1">
                            <span className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              Hết hạn {method.expiryDate}
                            </span>
                            <span className="flex items-center">
                              <Building className="h-3 w-3 mr-1" />
                              {method.issuer}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        {!method.isDefault && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSetDefault(method.id)}
                          >
                            Đặt làm mặc định
                          </Button>
                        )}

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit3 className="h-4 w-4 mr-2" />
                              Chỉnh sửa
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => handleDelete(method.id)}
                              disabled={method.isDefault}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Xóa
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>{" "}
            {/* Add New Payment Method */}
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full sm:w-auto">
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm Phương Thức Thanh Toán Mới
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Thêm Phương Thức Thanh Toán</DialogTitle>
                  <DialogDescription>
                    Thêm thẻ tín dụng hoặc thẻ ghi nợ mới cho việc đặt tour của
                    bạn.
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cardNumber">Số Thẻ</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={(e) =>
                        setFormData({ ...formData, cardNumber: e.target.value })
                      }
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate">Ngày Hết Hạn</Label>
                      <Input
                        id="expiryDate"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            expiryDate: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">Mã CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={(e) =>
                          setFormData({ ...formData, cvv: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="cardholderName">Tên Chủ Thẻ</Label>
                    <Input
                      id="cardholderName"
                      placeholder="Nguyễn Văn A"
                      value={formData.cardholderName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          cardholderName: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="billingZip">Mã Bưu Điện</Label>
                    <Input
                      id="billingZip"
                      placeholder="12345"
                      value={formData.billingZip}
                      onChange={(e) =>
                        setFormData({ ...formData, billingZip: e.target.value })
                      }
                    />
                  </div>
                </div>

                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsAddDialogOpen(false)}
                  >
                    Hủy bỏ
                  </Button>
                  <Button onClick={handleAddCard}>Thêm Thẻ</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>{" "}
            {/* Additional Info */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="text-lg">
                  Các Phương Thức Thanh Toán Được Chấp Nhận
                </CardTitle>
                <CardDescription>
                  Chúng tôi chấp nhận các phương thức thanh toán sau đây để
                  thuận tiện cho bạn.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    {getCardIcon("visa")}
                    <span className="text-sm">Visa</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getCardIcon("mastercard")}
                    <span className="text-sm">Mastercard</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getCardIcon("amex")}
                    <span className="text-sm">American Express</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentMethodsPage;
