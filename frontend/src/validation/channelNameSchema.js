import * as Yup from 'yup';

const channelNameShema = (
  channelsNames,
  channelNameLength,
  requiredField,
  uniqueNameError,
) => Yup.object().shape({
  name: Yup
    .string()
    .trim()
    .min(3, channelNameLength)
    .max(20, channelNameLength)
    .required(requiredField)
    .notOneOf(channelsNames, uniqueNameError),
});

export default channelNameShema;
