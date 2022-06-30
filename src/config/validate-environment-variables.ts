import * as yup from 'yup';
import { ConfigValue } from '.';

const environmentVariablesSchema = yup.object().shape({
  NODE_ENV: yup
    .string()
    .oneOf(['development', 'production'])
    .default('development'),
  NEXT_PUBLIC_COFFEELAND_API_ENPOINT: yup.string().required(),
});

export function validateEnvironmentVariables() {
  environmentVariablesSchema
    .validate(
      Object.fromEntries(
        Object.keys(ConfigValue).map((key) => [
          key,
          ConfigValue[key as keyof typeof ConfigValue],
        ])
      ),
      {
        abortEarly: false,
      }
    )
    .catch(function (err) {
      throw new Error(
        `Validar las siguientes variables de entorno: ${err.errors.join(', ')}`
      );
    });
}
