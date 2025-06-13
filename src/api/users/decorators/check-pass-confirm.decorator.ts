import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function CheckPasswordConfirm(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'checkPasswordConfirm',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(_value: any, args: ValidationArguments) {
          const { newPassword, passwordConfirm } = args.object as any;

          return !!(newPassword === passwordConfirm);
        },
        defaultMessage() {
          return 'password and password confirm should be the same';
        },
      },
    });
  };
}
