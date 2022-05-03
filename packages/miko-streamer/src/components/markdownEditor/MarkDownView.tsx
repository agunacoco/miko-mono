import { Text } from '@chakra-ui/react';
import { FC, useCallback, useMemo, useState } from 'react';
import { BaseEditor, createEditor, Descendant } from 'slate';
import { HistoryEditor } from 'slate-history';
import { Editable, ReactEditor, Slate, withReact } from 'slate-react';

import { RenderElements } from './RenderElements';

type CustomElement = { type: 'paragraph'; children: CustomText[] };
type CustomText = { text: string; bold?: true };

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

export const MarkDownView: FC<{ mdString: string }> = ({ mdString }) => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const renderElement = useCallback((props) => <RenderElements {...props} />, []);
  const [, setValue] = useState<Descendant[]>([]);

  let descendants;
  try {
    descendants = JSON.parse(mdString) as Descendant[];
  } catch (e) {
    return <Text>no contents</Text>;
  }

  const isArray = Array.isArray(descendants);
  if (!isArray) return <Text>no contents</Text>;

  return (
    <Slate editor={editor} value={descendants} onChange={(newValue) => setValue(newValue)}>
      <Editable readOnly renderElement={renderElement} />
    </Slate>
  );
};
