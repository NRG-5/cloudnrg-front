
import UsageChart from "@/app/analitics/_components/usage-chart";
import StorageChart from "@/app/analitics/_components/storage-chart";
import TypeFilesChart from "@/app/analitics/_components/type-files-chart";
import NumberFilesCard from "@/app/analitics/_components/number-files-card";

export default function AnaliticsPage(){
    return(
        <>
            <div className={`p-6`}>
                <h1 className={`text-center text-4xl font-medium mb-4`}>
                    Analitics
                </h1>
                <div className={`w-full p-4 border rounded space-y-4`}>
                    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4`}>
                        <UsageChart/>
                        <StorageChart/>
                    </div>
                    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4`}>
                        <TypeFilesChart/>
                        <NumberFilesCard/>
                    </div>
                </div>
            </div>
        </>
    );
}