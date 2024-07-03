import { FieldArrayWithId, UseFormRegister, FieldErrors, UseFormUnregister } from "react-hook-form";
import { authenticationMethods } from "../../constants/create-network";
import { ConfigureRelayChainSchemaType } from "../step-2-configure-relay-chain";
import { IconButton } from "@/lib/components/Button";
import { Label, Checkbox, Radio, FormFieldStatus, Password, Input } from "@/lib/components/Form";
import { FormField } from "@/lib/components/Form/FormField";
import { Heading } from "@/lib/components/Heading";
import SvgPlusSquare from "@/lib/icons/essential/outline/PlusSquare";
import { tx } from "@/utils/shared";

const AddRpcForm = ({
  fields,
  register,
  unregister,
  errors,
  watchRPCNodes,
}: {
  fields: FieldArrayWithId<ConfigureRelayChainSchemaType, "rpcNodes", "id">[];
  register: UseFormRegister<ConfigureRelayChainSchemaType>;
  unregister: UseFormUnregister<ConfigureRelayChainSchemaType>;
  errors: FieldErrors<ConfigureRelayChainSchemaType>;
  //   appendCollator: UseFieldArrayAppend<ConfigureRelayChainSchemaType, "rpcNodes">;
  watchRPCNodes: ConfigureRelayChainSchemaType["rpcNodes"];
}) => {
  return (
    <>
      <Heading as="h4" className="text-brand-dark-blue">
        RPC Nodes
      </Heading>
      {fields.map((field, index) => (
        <div key={field.id} className="grid grid-cols-12 items-start gap-3 p-3 lg:gap-6">
          {/* Node name */}
          <FormField
            className="col-span-12 md:col-span-6 lg:col-span-3"
            helper={{
              status: "error",
              text: errors.rpcNodes?.[index]?.name?.message?.toString(),
            }}
          >
            <Label>RPC Name</Label>
            <Input
              {...register(`rpcNodes.${index}.name`)}
              type="text"
              isRequired
              placeholder="Name"
              floatingLabel={{
                labelText: "Name",
              }}
            />
          </FormField>
          {/* Enabled Public Endpoint */}
          <div className="col-span-12 flex flex-col gap-3 lg:gap-6">
            <Heading as="h5">Enabled Public Endpoint</Heading>
            <div className="grid grid-cols-12 gap-3 lg:gap-6">
              <Checkbox
                {...register(`rpcNodes.${index}.http`)}
                checkboxLabelProps={{
                  className: tx("text-xm font-poppins col-span-6 lg:col-span-2"),
                }}
              >
                HTTPS
              </Checkbox>
              <Checkbox
                {...register(`rpcNodes.${index}.ws`)}
                checkboxLabelProps={{
                  className: "text-sm font-poppins col-span-6 lg:col-span-2",
                }}
                isDisabled
              >
                WSS
              </Checkbox>
            </div>
          </div>
          {/* <hr className="col-span-12 border-brand-outline" /> */}
          {/* authentication methods */}
          <Heading as="h5" className="col-span-12">
            Please Select One Authentication Method From The Below
          </Heading>
          <div className="col-span-12 grid grid-cols-12 gap-3  lg:gap-6">
            {authenticationMethods.length
              ? authenticationMethods.map((item) => {
                  return (
                    <div key={item.name} className="col-span-6 flex flex-row items-center gap-1 lg:col-span-2">
                      <Radio
                        {...register(`rpcNodes.${index}.credentials.type`, {
                          onChange: (e) => {
                            if (e.target.value === "api_key") {
                              // unregister username and password if selected authorization method is `api_key`
                              unregister([
                                `rpcNodes.${index}.credentials.username`,
                                `rpcNodes.${index}.credentials.password`,
                              ]);
                            }
                          },
                        })}
                        value={item.value}
                        colorScheme={"blue"}
                        isDisabled={item.isDisabled}
                      >
                        {item.name}
                      </Radio>
                      {/* {item.tooltipText ? (
                            <Tooltip text={item.tooltipText} placement="top-start">
                              <IconButton variant="text" colorScheme="gray">
                                <SvgInfoCircle className="text-base" />
                              </IconButton>
                            </Tooltip>
                          ) : null} */}
                    </div>
                  );
                })
              : null}
          </div>
          {errors.rpcNodes?.[index]?.credentials && (
            <FormFieldStatus className="text-xs lg:text-sm" status="error">
              {errors.rpcNodes?.[index]?.credentials?.message?.toString()}
            </FormFieldStatus>
          )}
          {/* show username and password fields only in case of "basic_auth" */}
          {watchRPCNodes?.[index]?.credentials?.type === "basic_auth" ? (
            <div className="col-span-12 flex flex-col gap-3 lg:gap-6">
              <Heading as="h5">Basic Auth</Heading>
              <div className="grid grid-cols-12 gap-3 lg:gap-6">
                {/* username */}
                <FormField
                  className="col-span-12 md:col-span-6 lg:col-span-3"
                  helper={{
                    status: "error",
                    text: errors.rpcNodes?.[index]?.credentials?.username?.message?.toString(),
                  }}
                >
                  <Input
                    {...register(`rpcNodes.${index}.credentials.username`)}
                    type="text"
                    isRequired
                    placeholder="Username"
                    floatingLabel={{
                      labelText: "Username",
                    }}
                  />
                </FormField>
                {/* password */}
                <FormField
                  className="col-span-12 md:col-span-6 lg:col-span-3"
                  helper={{
                    status: "error",
                    text: errors.rpcNodes?.[index]?.credentials?.password?.message?.toString(),
                  }}
                >
                  <Password
                    {...register(`rpcNodes.${index}.credentials.password`)}
                    shouldToggleMask
                    isRequired
                    placeholder="Password"
                    floatingLabel={{
                      labelText: "Password",
                    }}
                  />
                </FormField>
              </div>
            </div>
          ) : null}
        </div>
      ))}
      <div className="flex justify-end">
        <IconButton isDisabled size={"large"} variant={"text"} className="font-bold">
          Add More <SvgPlusSquare className="pl-2" height={30} width={30} />
        </IconButton>
      </div>
    </>
  );
};

export default AddRpcForm;
