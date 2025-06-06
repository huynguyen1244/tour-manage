import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Languages } from "lucide-react";

const languages = [
  { id: "en", name: "Tiếng Anh", flag: "🇺🇸" },
  { id: "es", name: "Tiếng Tây Ban Nha", flag: "🇪🇸" },
  { id: "fr", name: "Tiếng Pháp", flag: "🇫🇷" },
  { id: "de", name: "Tiếng Đức", flag: "🇩🇪" },
  { id: "it", name: "Tiếng Ý", flag: "🇮🇹" },
  { id: "pt", name: "Tiếng Bồ Đào Nha", flag: "🇵🇹" },
  { id: "ru", name: "Tiếng Nga", flag: "🇷🇺" },
  { id: "zh", name: "Tiếng Trung Quốc", flag: "🇨🇳" },
  { id: "ja", name: "Tiếng Nhật", flag: "🇯🇵" },
  { id: "ko", name: "Tiếng Hàn", flag: "🇰🇷" },
  { id: "ar", name: "Tiếng Ả Rập", flag: "🇸🇦" },
  { id: "hi", name: "Tiếng Hindi", flag: "🇮🇳" },
  { id: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
];

const LanguageSettingsPage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value);
    // Here you would implement actual language change logic
    localStorage.setItem("language", value);
  };
  const handleApplySettings = () => {
    // Here you would apply the language settings and potentially reload the app
    alert(
      `Đã thay đổi ngôn ngữ thành ${
        languages.find((l) => l.id === selectedLanguage)?.name
      }`
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Languages className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">Cài Đặt Ngôn Ngữ</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Chọn Ngôn Ngữ Ưa Thích</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={selectedLanguage}
            onValueChange={handleLanguageChange}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {languages.map((language) => (
              <div key={language.id} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={language.id}
                  id={`language-${language.id}`}
                />
                <Label
                  htmlFor={`language-${language.id}`}
                  className="flex items-center"
                >
                  <span className="mr-2 text-xl">{language.flag}</span>
                  {language.name}
                </Label>
              </div>
            ))}
          </RadioGroup>

          <div className="mt-6">
            <Button onClick={handleApplySettings}>
              Áp Dụng Cài Đặt Ngôn Ngữ
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cài Đặt Khu Vực</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Tùy chỉnh định dạng ngày tháng, định dạng số và các tùy chọn khu vực
            khác.
          </p>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date-format">Định Dạng Ngày</Label>
                <select
                  id="date-format"
                  className="w-full p-2 border rounded-md mt-1"
                  defaultValue="mm/dd/yyyy"
                >
                  <option value="mm/dd/yyyy">MM/DD/YYYY</option>
                  <option value="dd/mm/yyyy">DD/MM/YYYY</option>
                  <option value="yyyy/mm/dd">YYYY/MM/DD</option>
                  <option value="yyyy-mm-dd">YYYY-MM-DD</option>
                </select>
              </div>
              <div>
                <Label htmlFor="time-format">Định Dạng Giờ</Label>
                <select
                  id="time-format"
                  className="w-full p-2 border rounded-md mt-1"
                  defaultValue="12h"
                >
                  <option value="12h">12 giờ (AM/PM)</option>
                  <option value="24h">24 giờ</option>
                </select>
              </div>
            </div>
            <div>
              <Label htmlFor="timezone">Múi Giờ</Label>
              <select
                id="timezone"
                className="w-full p-2 border rounded-md mt-1"
                defaultValue="auto"
              >
                <option value="auto">Tự động (Dựa trên trình duyệt)</option>
                <option value="utc">UTC (Giờ phối hợp thế giới)</option>
                <option value="est">EST (Giờ miền Đông)</option>
                <option value="pst">PST (Giờ Thái Bình Dương)</option>
                <option value="gmt+7">GMT+7 (Giờ Việt Nam)</option>
              </select>
            </div>
            <div className="flex justify-end">
              <Button>Lưu Cài Đặt</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LanguageSettingsPage;
