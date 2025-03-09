"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Wand2,
  Sparkles,
  MagnetIcon as Magic,
  Upload,
  Palette,
  Layers,
  Zap,
  Download,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Page() {
  const t = useTranslations("HomePage");

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [outPreview, setOutPreview] = useState();
  const router = useRouter();
  const pathname = usePathname();
  const [selectedLang, setSelectedLang] = useState("🇺🇸 English");

  useEffect(() => {
    const langcode = pathname.split("/")[1];
    languages.forEach((lang) => {
      if (lang.code == langcode) {
        setSelectedLang(lang.label);
      }
    });
  }, [pathname]);

  const handleUploadClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setPreview(URL.createObjectURL(event.target.files[0]));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      alert("Please select a file.");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result.split(",")[1]; // Remove metadata

      try {
        const response = await fetch(
          "https://pvj9mb5v91.execute-api.ap-south-1.amazonaws.com/dev/trasform",
          {
            method: "POST",
            body: JSON.stringify({ image: base64Image }),
          }
        );
        const result = await response.json();
        const outBase64Image = result.image;
        setOutPreview(`data:image/png;base64, ${outBase64Image}`);
      } catch (error) {
        console.log("Error uploading file.");
      }
    };
  };

  const handleDownload = () => {
    if (outPreview) {
      const base64Image = outPreview.startsWith("data:image/")
        ? outPreview
        : `data:image/png;base64,${outPreview}`;

      const link = document.createElement("a");
      link.href = base64Image;
      link.download = "cartoonized_image.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const languages = [
    { code: "en", label: "🇺🇸 English" },
    { code: "hi", label: "🇮🇳 हिन्दी" },
    { code: "zh", label: "🇨🇳 中文" },
    { code: "fr", label: "🇫🇷 Français" },
    { code: "es", label: "🇪🇸 Español" },
    { code: "de", label: "🇩🇪 Deutsch" },
  ];

  const changeLanguage = (lang) => {
    setSelectedLang(lang.label);
    router.push(`/${lang.code}`);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="px-4 lg:px-6 h-16 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <Wand2 className="h-6 w-6" />
          <span className="ml-2 text-lg font-bold">Cartoonizer</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <DropdownMenu>
            <DropdownMenuTrigger>{selectedLang}</DropdownMenuTrigger>
            <DropdownMenuContent>
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => changeLanguage(lang)}
                >
                  {lang.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </header>
      <main className="flex-1">
        <section className="flex justify-center w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge variant="outline" className="rounded-full">
                  {t("aiPowered")}
                </Badge>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  {t("transformYourPhotos")}
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  {t("turnAnyPhoto")}
                </p>
              </div>
              <div className="space-x-4">
                <Link href="#demo">
                  <Button size="lg">
                    {t("tryItFree")}
                    <Wand2 className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="#examples">
                  <Button variant="outline" size="lg">
                    {t("viewExamples")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section
          className="flex justify-center w-full py-12 md:py-24 lg:py-32"
          id="demo"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  {t("tryItNow")}
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  {t("turnAnyPhoto2")}
                </p>
              </div>
              <div className="grid w-full max-w-4xl gap-8 mt-8">
                <div className="flex flex-col items-center gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                    <Card className="w-full">
                      <CardHeader>
                        <CardTitle className="text-sm">
                          {t("originalPhoto")}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex flex-col items-center gap-4">
                        <div
                          className="border-2 border-dashed rounded-lg p-4 w-full aspect-square flex items-center justify-center bg-muted cursor-pointer"
                          onClick={handleUploadClick} // Make the whole div clickable
                        >
                          <div className="flex flex-col items-center gap-2">
                            {!file && (
                              <Upload className="h-8 w-8 text-gray-400" />
                            )}
                            {!file && (
                              <p className="text-sm text-gray-500">
                                {t("dropYourPhoto")}
                              </p>
                            )}
                            {file && (
                              <div className="relative w-72 h-72">
                                <Image
                                  src={preview}
                                  alt="Preview"
                                  layout="fill"
                                  objectFit="cover"
                                  className="rounded-md"
                                />
                              </div>
                            )}
                          </div>
                          {/* Hidden file input */}
                          <Input
                            id="fileInput"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                          />
                        </div>
                        {file && (
                          <p className="text-sm text-gray-700">
                            {t("selected")}: {file.name}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                    <Card className="w-full">
                      <CardHeader>
                        <CardTitle className="text-sm">
                          {t("cartoonizedResult")}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="rounded-lg w-full aspect-square flex items-center justify-center bg-muted">
                          {!outPreview ? (
                            <Magic className="h-8 w-8 text-gray-400" />
                          ) : (
                            <div className="relative w-72 h-72">
                              <Image
                                src={outPreview}
                                alt="Preview"
                                layout="fill"
                                objectFit="cover"
                                className="rounded-md"
                                unoptimized
                              />
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <Button size="lg" className="mt-4" onClick={handleSubmit}>
                    {t("transformImage")}
                    <Sparkles className="ml-2 h-4 w-4" />
                  </Button>
                  {outPreview && (
                    <Button
                      size="lg"
                      variant="secondary"
                      onClick={handleDownload}
                    >
                      {t("download")}
                      <Download className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="flex justify-center w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900"
          id="features"
        >
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 px-10 md:gap-16">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  {t("amazing_features")}
                </h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  {t("features_description")}
                </p>
              </div>
              <div className="grid gap-6 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <Zap className="h-10 w-10 mb-2" />
                    <CardTitle>{t("instant_transform")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {t("instant_transform_description")}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <Palette className="h-10 w-10 mb-2" />
                    <CardTitle>{t("multiple_styles")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {t("multiple_styles_description")}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <Layers className="h-10 w-10 mb-2" />
                    <CardTitle>{t("high_quality")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {t("high_quality_description")}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section
          className="flex justify-center w-full py-12 md:py-24 lg:py-32"
          id="examples"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  {t("before_after")}
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  {t("before_after_description")}
                </p>
              </div>
              <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <img
                        alt={`${t("original")} ${i}`}
                        className="aspect-square rounded-lg object-cover"
                        src={`/placeholder.svg?height=300&width=300`}
                      />
                      <img
                        alt={`${t("cartoonized")} ${i}`}
                        className="aspect-square rounded-lg object-cover"
                        src={`/placeholder.svg?height=300&width=300`}
                      />
                    </div>
                    <p className="text-sm text-gray-500">
                      {`${t("example")} ${i}`}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="flex justify-center w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  {t("start_cartoonizing")}
                </h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  {t("start_cartoonizing_description")}
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1"
                    placeholder={t("enter_email")}
                    type="email"
                  />
                  <Button type="submit">
                    {t("get_started")}
                    <Wand2 className="ml-2 h-4 w-4" />
                  </Button>
                </form>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {t("free_credits")}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {t("copyright")}
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            {t("terms_of_service")}
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            {t("privacy")}
          </Link>
        </nav>
      </footer>
    </div>
  );
}
