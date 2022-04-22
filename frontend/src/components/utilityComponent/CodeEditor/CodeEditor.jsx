import CodeMirror from '@uiw/react-codemirror';
import { oneDark } from '@codemirror/theme-one-dark';
import {cppLanguage} from "@codemirror/lang-cpp"
import {pythonLanguage} from "@codemirror/lang-python"
import {javaLanguage} from "@codemirror/lang-java"
import { saveCode } from './store/action';
import { useDispatch } from 'react-redux';

export default function CodeEditor({lang,problem_code,template}) {
    const dispatch = useDispatch()
    const langExtension = () => {
        switch (lang) {
            case 'java':
                return javaLanguage
            case 'python':
                return pythonLanguage
            default:
                return cppLanguage
        }
    }
    return (
    <>
    <CodeMirror
      value={template}
      extensions={[langExtension()]}
      height='40vh'
      onChange={(value) => {
        dispatch(saveCode({code:value,problem_code}))  
      }}
    />
    </>
    )
}