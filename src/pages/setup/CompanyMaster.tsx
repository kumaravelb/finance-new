import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SetupStepper } from "@/components/SetupStepper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function CompanyMaster() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const [formData, setFormData] = useState({
    companyCode: "",
    name: "",
    shortName: "",
    address1: "",
    address2: "",
    address3: "",
    baseCurrency1: "",
    baseCurrency2: "",
    roundOff: "",
    unitName: "",
    telNo: "",
    fax: "",
    emailId: "",
    theme: "default",
    companyLogo: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      toast({
        title: "Company Master Saved",
        description: "Company information has been successfully saved.",
      });
      navigate("/setup/company");
    }
  };

  const handleEnd = () => {
    navigate("/setup/company");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate("/setup/company")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Company Set Up - Company Master - step 1</h1>
        </div>
      </div>

      <SetupStepper
        currentStep={currentStep}
        totalSteps={totalSteps}
        onStepClick={(step) => step <= currentStep && setCurrentStep(step)}
      />

      <Card>
        <CardHeader className="bg-primary text-primary-foreground">
          <CardTitle>Add/Edit Company</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="companyCode">Company Code *</Label>
                <Input
                  id="companyCode"
                  value={formData.companyCode}
                  onChange={(e) => handleInputChange("companyCode", e.target.value)}
                  className="bg-yellow-100 dark:bg-yellow-900/20"
                />
              </div>

              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="shortName">Short Name</Label>
                <Input
                  id="shortName"
                  value={formData.shortName}
                  onChange={(e) => handleInputChange("shortName", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="address1">Address 1</Label>
                <Input
                  id="address1"
                  value={formData.address1}
                  onChange={(e) => handleInputChange("address1", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="address2">Address 2</Label>
                <Input
                  id="address2"
                  value={formData.address2}
                  onChange={(e) => handleInputChange("address2", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="address3">Address 3</Label>
                <Input
                  id="address3"
                  value={formData.address3}
                  onChange={(e) => handleInputChange("address3", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="baseCurrency1">Base Currency 1</Label>
                <Select value={formData.baseCurrency1} onValueChange={(value) => handleInputChange("baseCurrency1", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="--Select--" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usd">USD</SelectItem>
                    <SelectItem value="eur">EUR</SelectItem>
                    <SelectItem value="gbp">GBP</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="baseCurrency2">Base Currency 2</Label>
                <Select value={formData.baseCurrency2} onValueChange={(value) => handleInputChange("baseCurrency2", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="--Select--" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usd">USD</SelectItem>
                    <SelectItem value="eur">EUR</SelectItem>
                    <SelectItem value="gbp">GBP</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="unitName">Unit Name</Label>
                <Input
                  id="unitName"
                  value={formData.unitName}
                  onChange={(e) => handleInputChange("unitName", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="fax">Fax</Label>
                <Input
                  id="fax"
                  value={formData.fax}
                  onChange={(e) => handleInputChange("fax", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="theme">Theme</Label>
                <Select value={formData.theme} onValueChange={(value) => handleInputChange("theme", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Default" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="modern">Modern</SelectItem>
                    <SelectItem value="classic">Classic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="freezeYN">Freeze Y/N</Label>
                <div className="flex gap-4 mt-2">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="freezeYN" value="yes" />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="freezeYN" value="no" defaultChecked />
                    <span>No</span>
                  </label>
                </div>
              </div>

              <div>
                <Label htmlFor="nameBL">Name BL</Label>
                <Input
                  id="nameBL"
                  onChange={(e) => handleInputChange("nameBL", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="shortNameBL">Short Name BL</Label>
                <Input
                  id="shortNameBL"
                  onChange={(e) => handleInputChange("shortNameBL", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="address1BL">Address 1 BL</Label>
                <Input
                  id="address1BL"
                  onChange={(e) => handleInputChange("address1BL", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="address2BL">Address 2 BL</Label>
                <Input
                  id="address2BL"
                  onChange={(e) => handleInputChange("address2BL", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="address3BL">Address 3 BL</Label>
                <Input
                  id="address3BL"
                  onChange={(e) => handleInputChange("address3BL", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="baseCurrency3">Base Currency 3</Label>
                <Select onValueChange={(value) => handleInputChange("baseCurrency3", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="--Select--" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usd">USD</SelectItem>
                    <SelectItem value="eur">EUR</SelectItem>
                    <SelectItem value="gbp">GBP</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="roundOff">Round Off</Label>
                <Input
                  id="roundOff"
                  value={formData.roundOff}
                  onChange={(e) => handleInputChange("roundOff", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="telNo">Tel No</Label>
                <Input
                  id="telNo"
                  value={formData.telNo}
                  onChange={(e) => handleInputChange("telNo", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="emailId">Email Id</Label>
                <Input
                  id="emailId"
                  type="email"
                  value={formData.emailId}
                  onChange={(e) => handleInputChange("emailId", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="companyLogo">Company Logo</Label>
                <Input
                  id="companyLogo"
                  type="file"
                  onChange={(e) => handleInputChange("companyLogo", e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <Button variant="outline" onClick={handleEnd}>
              End
            </Button>
            <Button onClick={handleNext}>
              {currentStep === totalSteps ? "Save" : "NEXT →"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
