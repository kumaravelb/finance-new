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
    // Step 1: Basic Info
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
    // Step 2: Financial Settings
    fiscalYearStart: "",
    fiscalYearEnd: "",
    taxId: "",
    registrationNumber: "",
    bankName: "",
    bankAccountNumber: "",
    ifscCode: "",
    // Step 3: Contact Details
    contactPerson: "",
    contactEmail: "",
    contactPhone: "",
    website: "",
    socialMedia: "",
    // Step 4: Additional Settings
    industry: "",
    employeeCount: "",
    businessType: "",
    gstNumber: "",
    // Step 5: Preferences
    dateFormat: "",
    timeZone: "",
    language: "",
    currency: "",
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

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      case 5:
        return renderStep5();
      default:
        return renderStep1();
    }
  };

  const renderStep1 = () => (
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
          <Label htmlFor="unitName">Unit Name</Label>
          <Input
            id="unitName"
            value={formData.unitName}
            onChange={(e) => handleInputChange("unitName", e.target.value)}
          />
        </div>
      </div>

      {/* Right Column */}
      <div className="space-y-4">
        <div>
          <Label>Freeze Y/N</Label>
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
          <Label htmlFor="telNo">Tel No</Label>
          <Input
            id="telNo"
            value={formData.telNo}
            onChange={(e) => handleInputChange("telNo", e.target.value)}
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
          <Label htmlFor="emailId">Email Id</Label>
          <Input
            id="emailId"
            type="email"
            value={formData.emailId}
            onChange={(e) => handleInputChange("emailId", e.target.value)}
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

        <div>
          <Label htmlFor="companyLogo">Company Logo</Label>
          <Input
            id="companyLogo"
            type="file"
            onChange={(e) => handleInputChange("companyLogo", e.target.value)}
          />
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
          <Label htmlFor="roundOff">Round Off</Label>
          <Input
            id="roundOff"
            value={formData.roundOff}
            onChange={(e) => handleInputChange("roundOff", e.target.value)}
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="fiscalYearStart">Fiscal Year Start Date</Label>
          <Input
            id="fiscalYearStart"
            type="date"
            value={formData.fiscalYearStart}
            onChange={(e) => handleInputChange("fiscalYearStart", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="fiscalYearEnd">Fiscal Year End Date</Label>
          <Input
            id="fiscalYearEnd"
            type="date"
            value={formData.fiscalYearEnd}
            onChange={(e) => handleInputChange("fiscalYearEnd", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="taxId">Tax ID / EIN</Label>
          <Input
            id="taxId"
            value={formData.taxId}
            onChange={(e) => handleInputChange("taxId", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="registrationNumber">Company Registration Number</Label>
          <Input
            id="registrationNumber"
            value={formData.registrationNumber}
            onChange={(e) => handleInputChange("registrationNumber", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="bankName">Bank Name</Label>
          <Input
            id="bankName"
            value={formData.bankName}
            onChange={(e) => handleInputChange("bankName", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="bankAccountNumber">Bank Account Number</Label>
          <Input
            id="bankAccountNumber"
            value={formData.bankAccountNumber}
            onChange={(e) => handleInputChange("bankAccountNumber", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="ifscCode">IFSC / SWIFT Code</Label>
          <Input
            id="ifscCode"
            value={formData.ifscCode}
            onChange={(e) => handleInputChange("ifscCode", e.target.value)}
          />
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="contactPerson">Primary Contact Person</Label>
          <Input
            id="contactPerson"
            value={formData.contactPerson}
            onChange={(e) => handleInputChange("contactPerson", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="contactEmail">Contact Email</Label>
          <Input
            id="contactEmail"
            type="email"
            value={formData.contactEmail}
            onChange={(e) => handleInputChange("contactEmail", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="contactPhone">Contact Phone</Label>
          <Input
            id="contactPhone"
            value={formData.contactPhone}
            onChange={(e) => handleInputChange("contactPhone", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            type="url"
            value={formData.website}
            onChange={(e) => handleInputChange("website", e.target.value)}
            placeholder="https://example.com"
          />
        </div>

        <div>
          <Label htmlFor="socialMedia">Social Media Links</Label>
          <Input
            id="socialMedia"
            value={formData.socialMedia}
            onChange={(e) => handleInputChange("socialMedia", e.target.value)}
            placeholder="LinkedIn, Twitter, etc."
          />
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="industry">Industry Type</Label>
          <Select value={formData.industry} onValueChange={(value) => handleInputChange("industry", value)}>
            <SelectTrigger>
              <SelectValue placeholder="--Select Industry--" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="manufacturing">Manufacturing</SelectItem>
              <SelectItem value="retail">Retail</SelectItem>
              <SelectItem value="services">Services</SelectItem>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="businessType">Business Type</Label>
          <Select value={formData.businessType} onValueChange={(value) => handleInputChange("businessType", value)}>
            <SelectTrigger>
              <SelectValue placeholder="--Select Type--" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="proprietorship">Proprietorship</SelectItem>
              <SelectItem value="partnership">Partnership</SelectItem>
              <SelectItem value="llc">LLC</SelectItem>
              <SelectItem value="corporation">Corporation</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="employeeCount">Number of Employees</Label>
          <Select value={formData.employeeCount} onValueChange={(value) => handleInputChange("employeeCount", value)}>
            <SelectTrigger>
              <SelectValue placeholder="--Select Range--" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-10">1-10</SelectItem>
              <SelectItem value="11-50">11-50</SelectItem>
              <SelectItem value="51-200">51-200</SelectItem>
              <SelectItem value="201-500">201-500</SelectItem>
              <SelectItem value="500+">500+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="gstNumber">GST Number</Label>
          <Input
            id="gstNumber"
            value={formData.gstNumber}
            onChange={(e) => handleInputChange("gstNumber", e.target.value)}
          />
        </div>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="dateFormat">Date Format</Label>
          <Select value={formData.dateFormat} onValueChange={(value) => handleInputChange("dateFormat", value)}>
            <SelectTrigger>
              <SelectValue placeholder="--Select Format--" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
              <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
              <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="timeZone">Time Zone</Label>
          <Select value={formData.timeZone} onValueChange={(value) => handleInputChange("timeZone", value)}>
            <SelectTrigger>
              <SelectValue placeholder="--Select Time Zone--" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ist">IST (UTC+5:30)</SelectItem>
              <SelectItem value="est">EST (UTC-5:00)</SelectItem>
              <SelectItem value="pst">PST (UTC-8:00)</SelectItem>
              <SelectItem value="gmt">GMT (UTC+0:00)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="language">Default Language</Label>
          <Select value={formData.language} onValueChange={(value) => handleInputChange("language", value)}>
            <SelectTrigger>
              <SelectValue placeholder="--Select Language--" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="spanish">Spanish</SelectItem>
              <SelectItem value="french">French</SelectItem>
              <SelectItem value="german">German</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="currency">Default Currency</Label>
          <Select value={formData.currency} onValueChange={(value) => handleInputChange("currency", value)}>
            <SelectTrigger>
              <SelectValue placeholder="--Select Currency--" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="usd">USD - US Dollar</SelectItem>
              <SelectItem value="eur">EUR - Euro</SelectItem>
              <SelectItem value="gbp">GBP - British Pound</SelectItem>
              <SelectItem value="inr">INR - Indian Rupee</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );

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
          <h1 className="text-2xl font-bold">Company Set Up - Company Master - step {currentStep}</h1>
        </div>
      </div>

      <SetupStepper
        currentStep={currentStep}
        totalSteps={totalSteps}
        onStepClick={(step) => step <= currentStep && setCurrentStep(step)}
      />

      <Card>
        <CardHeader className="bg-primary text-primary-foreground">
          <CardTitle>
            {currentStep === 1 && "Basic Company Information"}
            {currentStep === 2 && "Financial Settings"}
            {currentStep === 3 && "Contact Details"}
            {currentStep === 4 && "Additional Settings"}
            {currentStep === 5 && "Preferences & Configuration"}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          {renderStepContent()}

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
