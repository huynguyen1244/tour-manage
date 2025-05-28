import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useTheme } from "next-themes";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Palette,
  Sun,
  Moon,
  Monitor,
  Check,
  Eye,
  RefreshCw,
  Sparkles,
  Contrast,
  Paintbrush,
} from "lucide-react";

const ColorThemePage = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const themeOptions = [
    {
      id: "light",
      name: "Light Mode",
      description: "Clean and bright appearance",
      icon: Sun,
      preview: "bg-white border-gray-200 text-gray-900",
    },
    {
      id: "dark",
      name: "Dark Mode",
      description: "Easier on the eyes in low light",
      icon: Moon,
      preview: "bg-gray-900 border-gray-700 text-white",
    },
    {
      id: "system",
      name: "System Default",
      description: "Follows your device settings",
      icon: Monitor,
      preview:
        "bg-gradient-to-r from-white to-gray-900 border-gray-400 text-gray-600",
    },
  ];

  const accentColors = [
    {
      name: "Blue",
      value: "blue",
      class: "bg-blue-500",
      description: "Professional and trustworthy",
    },
    {
      name: "Green",
      value: "green",
      class: "bg-green-500",
      description: "Natural and calming",
    },
    {
      name: "Purple",
      value: "purple",
      class: "bg-purple-500",
      description: "Creative and modern",
    },
    {
      name: "Orange",
      value: "orange",
      class: "bg-orange-500",
      description: "Energetic and warm",
    },
    {
      name: "Red",
      value: "red",
      class: "bg-red-500",
      description: "Bold and vibrant",
    },
    {
      name: "Pink",
      value: "pink",
      class: "bg-pink-500",
      description: "Playful and friendly",
    },
  ];

  const [selectedAccent, setSelectedAccent] = useState("blue");

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Color Theme | TravelTour</title>
        <meta
          name="description"
          content="Customize your visual experience with different color themes and accents."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold font-poppins text-foreground mb-2">
                Color Theme
              </h1>
              <p className="text-muted-foreground">
                Customize your visual experience by choosing a theme that works
                best for you.
              </p>
            </div>

            {/* Current Theme Preview */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Eye className="h-5 w-5 mr-2" />
                  Current Theme Preview
                </CardTitle>
                <CardDescription>
                  See how your current theme looks with different elements.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Sample Tour Card</h3>
                    <Badge>Featured</Badge>
                  </div>
                  <p className="text-muted-foreground">
                    This is how your content will appear with the selected
                    theme.
                  </p>
                  <div className="flex space-x-2">
                    <Button size="sm">Book Now</Button>
                    <Button variant="outline" size="sm">
                      Learn More
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Theme Selection */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Contrast className="h-5 w-5 mr-2" />
                  Theme Mode
                </CardTitle>
                <CardDescription>
                  Choose between light, dark, or system-based theme.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {themeOptions.map((option) => {
                    const Icon = option.icon;
                    const isSelected = theme === option.id;

                    return (
                      <div key={option.id} className="relative">
                        <button
                          onClick={() => setTheme(option.id)}
                          className={`w-full p-4 rounded-lg border-2 transition-all hover:border-primary/50 ${
                            isSelected ? "border-primary" : "border-border"
                          }`}
                        >
                          <div
                            className={`h-16 rounded-md mb-3 flex items-center justify-center ${option.preview}`}
                          >
                            <Icon className="h-6 w-6" />
                          </div>
                          <h3 className="font-semibold mb-1">{option.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {option.description}
                          </p>
                        </button>
                        {isSelected && (
                          <div className="absolute -top-2 -right-2 bg-primary text-white rounded-full p-1">
                            <Check className="h-3 w-3" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Accent Colors */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Paintbrush className="h-5 w-5 mr-2" />
                  Accent Color
                </CardTitle>
                <CardDescription>
                  Choose an accent color for buttons, links, and highlights.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {accentColors.map((color) => (
                    <div key={color.value} className="relative">
                      <button
                        onClick={() => setSelectedAccent(color.value)}
                        className={`w-full p-4 rounded-lg border-2 transition-all hover:border-gray-300 ${
                          selectedAccent === color.value
                            ? "border-gray-400"
                            : "border-border"
                        }`}
                      >
                        <div
                          className={`h-8 w-8 rounded-full ${color.class} mx-auto mb-2`}
                        />
                        <h3 className="font-medium mb-1">{color.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          {color.description}
                        </p>
                      </button>
                      {selectedAccent === color.value && (
                        <div className="absolute -top-2 -right-2 bg-primary text-white rounded-full p-1">
                          <Check className="h-3 w-3" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Advanced Options */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sparkles className="h-5 w-5 mr-2" />
                  Advanced Options
                </CardTitle>
                <CardDescription>
                  Additional customization options for your theme.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">High Contrast Mode</h3>
                    <p className="text-sm text-muted-foreground">
                      Increases contrast for better accessibility
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Enable
                  </Button>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Reduced Motion</h3>
                    <p className="text-sm text-muted-foreground">
                      Minimizes animations and transitions
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Custom CSS</h3>
                    <p className="text-sm text-muted-foreground">
                      Apply your own custom styling
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Advanced
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Reset Options */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <RefreshCw className="h-5 w-5 mr-2" />
                  Reset & Restore
                </CardTitle>
                <CardDescription>
                  Reset your theme settings to default values.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setTheme("light");
                      setSelectedAccent("blue");
                    }}
                  >
                    Reset to Light Default
                  </Button>
                  <Button variant="outline" onClick={() => setTheme("system")}>
                    Use System Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default ColorThemePage;
