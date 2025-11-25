import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

function CommonForm({
  formControls,
  buttonText,
  formData,
  setFormData,
  onSubmit,
  disableBtn = false,
}) {
  const renderInputsByComponentType = (getControlItem) => {
    let element = null;
    const value = formData[getControlItem.name] || "";

    switch (getControlItem.componentType) {
      case "input":
        element = (
          <Input
            name={getControlItem.name}
            id={getControlItem.name}
            type={getControlItem.type}
            placeholder={getControlItem.placeholder}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;
      case "textarea":
        element = (
          <Textarea
            name={getControlItem.name}
            id={getControlItem.name}
            type={getControlItem.type}
            placeholder={getControlItem.placeholder}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          ></Textarea>
        );
        break;
      case "select":
        element = (
          <Select
            onValueChange={(val) =>
              setFormData({ ...formData, [getControlItem.name]: val })
            }
            value={value}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getControlItem.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {getControlItem.options && getControlItem.options.length > 0
                ? getControlItem.options.map((optionItem) => (
                    <SelectItem value={optionItem.id} key={optionItem.id}>
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;
      default:
        element = (
          <Input
            name={getControlItem.name}
            id={getControlItem.name}
            type={getControlItem.type}
            placeholder={getControlItem.placeholder}
          />
        );
        break;
    }
    return element;
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((controlItem) => (
          <div className="grid w-full gap-1.5" key={controlItem.name}>
            <Label>{controlItem.label}</Label>
            {renderInputsByComponentType(controlItem)}
          </div>
        ))}
      </div>
      <Button
        disabled={disableBtn}
        type="submit"
        className="mt-2 w-full disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
      >
       {disableBtn ? "Wait..." : buttonText || "Submit" }
      </Button>
    </form>
  );
}

export default CommonForm;
