import { Input, InputGroup, InputProps } from '@chakra-ui/input';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
} from '@chakra-ui/react';
import React, { FC, memo } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

type placeholder = string | undefined;
type label = string;

type necessary = [label, placeholder];

type BasicP = {
  registerReturn: UseFormRegisterReturn;
  error: FieldError | undefined;
  data: necessary;
  isNotRequired?: boolean;
};

type InputP = BasicP & { inputP?: InputProps };
type SelectP<T = any> = BasicP & { selectList: T[] };
type NumberP = BasicP & {
  defaultValue?: number;
  min?: number;
  max?: number;
};

const BasicWrapper: FC<BasicP> = memo(({ registerReturn, error, data: [label, placeholder], isNotRequired = false, children }) => {
  const name = registerReturn.name;
  return (
    <FormControl id={name} isRequired={!isNotRequired} isInvalid={error ? true : false} position="relative">
      <FormLabel htmlFor={name}>{label}</FormLabel>
      {children}
      <FormErrorMessage position="absolute">{error && error.message}</FormErrorMessage>
    </FormControl>
  );
});

const InputWrapper: FC<InputP> = memo(({ registerReturn, error, data, isNotRequired = false, inputP, children }) => {
  const name = registerReturn.name;
  const [label, placeholder] = data;
  return (
    <BasicWrapper registerReturn={registerReturn} error={error} data={data} isNotRequired={isNotRequired}>
      <InputGroup>
        <Input placeholder={placeholder} {...registerReturn} {...inputP} />
      </InputGroup>
    </BasicWrapper>
  );
});

const SelectWrapper: FC<SelectP> = memo(({ registerReturn, error, data, selectList: dataList, isNotRequired = false, children }) => {
  const name = registerReturn.name;
  const [label, placeholder] = data;
  return (
    <BasicWrapper registerReturn={registerReturn} error={error} data={data} isNotRequired={isNotRequired}>
      <Select placeholder={placeholder} {...registerReturn} className="p-region">
        {dataList.map((val, i) => {
          return (
            <option key={i} value={val}>
              {val}
            </option>
          );
        })}
      </Select>
    </BasicWrapper>
  );
});

const NumberInputWrapper: FC<NumberP> = memo(({ registerReturn, error, data, isNotRequired = false, defaultValue, min, max, children }) => {
  const name = registerReturn.name;
  const [label, placeholder] = data;
  return (
    <BasicWrapper registerReturn={registerReturn} error={error} data={data} isNotRequired={isNotRequired}>
      <NumberInput defaultValue={defaultValue} min={min} max={max}>
        <NumberInputField placeholder={placeholder} {...registerReturn} />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </BasicWrapper>
  );
});

export { InputWrapper, NumberInputWrapper, SelectWrapper };
