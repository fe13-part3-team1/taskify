import Card from '../DashboardCard/DashboardCard';
import { ColumnsType } from '@/components/Dashboard/DashboardColumn/action';
import GetDashboardCard from '../DashboardCard/action';
import AddCardBtn from './AddCardBtn';
import ColumnSettingList from './ColumnSettingList';

export default async function DashboardColumn({ title, id }: ColumnsType) {
  const data = await GetDashboardCard(id);

  const totalCounts = data?.totalCount;
  const cards = data?.cards;

  return (
    <div className="border-gray200 w-full shrink-0 border-b border-solid px-5 py-[18px] lg:w-[354px] lg:border-r lg:border-b-0">
      <div>
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center justify-center gap-2">
            <div className="bg-violet h-2 w-2 rounded-full" />
            <h2 className="text-bold16 text-black">{title}</h2>
            <span className="bg-gray200 text-medium12 text-gray500 ml-1 flex items-center justify-center rounded-sm px-1.5 py-[3px]">
              {totalCounts}
            </span>
          </div>
          <ColumnSettingList columnId={id} />
        </div>
        <div className="flex w-full flex-col gap-2 md:gap-4">
          <AddCardBtn columnId={id} />
          {cards?.map((card) => (
            <Card
              key={card.id}
              imageUrl={card.imageUrl}
              title={card.title}
              tags={card.tags}
              dueDate={card.dueDate}
              profile={card.assignee.profileImageUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
