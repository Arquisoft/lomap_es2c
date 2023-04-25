import MuiPaper, { PaperProps } from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

interface ExtraPaperProps {
    background: 'light' | 'main' | 'dark';
    padding?: boolean;
}

const PaperRoot = styled(MuiPaper, {
    shouldForwardProp: (prop) => prop !== 'background' && prop !== 'padding',
})<ExtraPaperProps>(({ theme, background, padding }) => ({
    backgroundColor: "#81c784",
    ...(padding && {
        padding: theme.spacing(1),
    }),
}));

export default function Paper(props: PaperProps & ExtraPaperProps) {
    const { background, classes, className, padding = false, ...other } = props;

    return (
        <PaperRoot
            square={false}
            elevation={12}
            background={background}
            padding={padding}
            className={className}
            {...other}
        />
    );
}
