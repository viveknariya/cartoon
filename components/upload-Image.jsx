"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, MagnetIcon as Magic, Upload, Download } from "lucide-react";
import Image from "next/image";
export default function UploadImage() {
  const t = useTranslations("HomePage");

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [outPreview, setOutPreview] = useState();
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
          // "https://pvj9mb5v91.execute-api.ap-south-1.amazonaws.com/dev/trasform",
          "http://3.108.219.10:8000/cartoonize",
          {
            method: "POST",
            body: JSON.stringify({ image: base64Image }),
            headers: {
              "Content-Type": "application/json",
            },
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

  return (
    <>
      <div className="grid w-full max-w-4xl gap-8 mt-8">
        <div className="flex flex-col items-center gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-sm">{t("originalPhoto")}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-4">
                <div
                  className="border-2 border-dashed rounded-lg p-4 w-full aspect-square flex items-center justify-center bg-muted cursor-pointer"
                  onClick={handleUploadClick} // Make the whole div clickable
                >
                  <div className="flex flex-col items-center gap-2">
                    {!file && <Upload className="h-8 w-8 text-gray-400" />}
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
            <Button size="lg" variant="secondary" onClick={handleDownload}>
              {t("download")}
              <Download className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
