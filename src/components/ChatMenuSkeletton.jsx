import { useTheme } from '@mui/material';

export const ChatMenuSkeletton = () => {
    const theme = useTheme();

    return(
        <div className=" rounded-md p-4 max-w-sm w-full mx-auto">
        <div className="animate-pulse flex space-x-4 flex-row items-center">
          <div className="rounded-full h-12 w-12" style={{backgroundColor: theme.palette.Skelettons.light}}></div>
          <div className="flex-1 space-y-3">
            <div className="h-3 rounded-full col-span-2" style={{backgroundColor: theme.palette.Skelettons.light}}></div>
            <div className="h-3 rounded-full col-span-1" style={{backgroundColor: theme.palette.Skelettons.light}}></div>
          </div>
        </div>
      </div>
    );
}