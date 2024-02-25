import { useTheme } from '@mui/material';

export const ChatMenuSkeletton = () => {
    const theme = useTheme();

    return(
        <div class=" rounded-md p-4 max-w-sm w-full mx-auto">
        <div class="animate-pulse flex space-x-4 flex-row items-center">
          <div class="rounded-full h-12 w-12" style={{backgroundColor: theme.palette.Skelettons.light}}></div>
          <div class="flex-1 space-y-3">
            <div class="h-3 rounded-full col-span-2" style={{backgroundColor: theme.palette.Skelettons.light}}></div>
            <div class="h-3 rounded-full col-span-1" style={{backgroundColor: theme.palette.Skelettons.light}}></div>
          </div>
        </div>
      </div>
    );
}