import { Loader } from 'lucide-react';

export default function PreLoader(){
    return(
        <div className="flex flex-col items-center">
            <div className="relative">
                <div className="h-16 w-16 rounded-full border-4 border-muted animate-pulse"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <Loader className="h-8 w-8 animate-spin text-primary" />
                </div>
            </div>
      </div>
    );
}