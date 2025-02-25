import { 
    GroupContainer,
    FormInputLabel,
    Input
 } from "./form-input.styles.jsx";

const FormInput = ({ label, ...otherProps }) => {
    return (
        <GroupContainer>
            <Input {...otherProps} />
            {label && (
                <FormInputLabel shrink={otherProps.value.length}>
                    {label}
                </FormInputLabel>
            )}
        </GroupContainer>
    );
};

export default FormInput;
