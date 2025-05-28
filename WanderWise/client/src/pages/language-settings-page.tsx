import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Languages } from "lucide-react";

const languages = [
  { id: "en", name: "English", flag: "🇺🇸" },
  { id: "es", name: "Spanish", flag: "🇪🇸" },
  { id: "fr", name: "French", flag: "🇫🇷" },
  { id: "de", name: "German", flag: "🇩🇪" },
  { id: "it", name: "Italian", flag: "🇮🇹" },
  { id: "pt", name: "Portuguese", flag: "🇵🇹" },
  { id: "ru", name: "Russian", flag: "🇷🇺" },
  { id: "zh", name: "Chinese", flag: "🇨🇳" },
  { id: "ja", name: "Japanese", flag: "🇯🇵" },
  { id: "ko", name: "Korean", flag: "🇰🇷" },
  { id: "ar", name: "Arabic", flag: "🇸🇦" },
  { id: "hi", name: "Hindi", flag: "🇮🇳" },
  { id: "vi", name: "Vietnamese", flag: "🇻🇳" },
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
      `Language changed to ${
        languages.find((l) => l.id === selectedLanguage)?.name
      }`
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Languages className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">Language Settings</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Select Your Preferred Language</CardTitle>
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
              Apply Language Settings
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Regional Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Customize date formats, number formats, and other regional
            preferences.
          </p>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date-format">Date Format</Label>
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
                <Label htmlFor="time-format">Time Format</Label>
                <select
                  id="time-format"
                  className="w-full p-2 border rounded-md mt-1"
                  defaultValue="12h"
                >
                  <option value="12h">12-hour (AM/PM)</option>
                  <option value="24h">24-hour</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="first-day">First Day of Week</Label>
                <select
                  id="first-day"
                  className="w-full p-2 border rounded-md mt-1"
                  defaultValue="sunday"
                >
                  <option value="sunday">Sunday</option>
                  <option value="monday">Monday</option>
                  <option value="saturday">Saturday</option>
                </select>
              </div>
              <div>
                <Label htmlFor="currency">Currency Display</Label>
                <select
                  id="currency"
                  className="w-full p-2 border rounded-md mt-1"
                  defaultValue="usd"
                >
                  <option value="usd">USD ($)</option>
                  <option value="eur">EUR (€)</option>
                  <option value="gbp">GBP (£)</option>
                  <option value="jpy">JPY (¥)</option>
                  <option value="cny">CNY (¥)</option>
                  <option value="krw">KRW (₩)</option>
                  <option value="inr">INR (₹)</option>
                  <option value="vnd">VND (₫)</option>{" "}
                </select>
              </div>
            </div>

            <Button>Save Regional Settings</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LanguageSettingsPage;
