import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { DropdownItem } from '../common/Dropdown/types';
import { postDashboardCardImage } from './action';
import checkAllFormComplete from '@/utils/checkAllFormComplete';
import formatDateTime, { parseDateTime } from '@/utils/formatDateTime';
import DEFAULT_CARD_IMAGE from '@/constants/image/defaultCardImage';
import EXTERNAL_API from '@/constants/api/external';
import { CardType } from '../Dashboard/DashboardCard/DashboardCard';

interface ToDoData {
  title: string;
  description: string;
  dueDate: Date | null;
  imageUrl: string | null;
}

const INITIAL_TO_DO_VALUE = {
  title: '',
  description: '',
  dueDate: null,
  imageUrl: null,
};

export default function useToDoData(
  columnId: number,
  dashboardId: number,
  onClose: () => void,
  getCards: (id?: number) => void,
  card?: CardType
) {
  const [toDoData, setToDoData] = useState<ToDoData>(INITIAL_TO_DO_VALUE);
  const [assigneeUser, setAssigneeUser] = useState<DropdownItem>({
    id: card?.assignee?.id ?? '',
    value: '',
  });
  const [columnName, setColumnName] = useState<DropdownItem>({
    id: columnId ?? 0,
    value: '',
  });
  const [tags, setTags] = useState<string[]>(card?.tags ?? []);

  useEffect(() => {
    if (card) {
      setToDoData({
        title: card.title,
        description: card.description,
        dueDate: parseDateTime(card.dueDate),
        imageUrl: card.imageUrl,
      });
    } else {
      setToDoData(INITIAL_TO_DO_VALUE);
    }
  }, [card]);

  const data = {
    title: toDoData.title,
    description: toDoData.description,
    dueDate: formatDateTime(toDoData.dueDate),
    dashboardId,
    assigneeUserId: assigneeUser.id,
    columnId: card ? columnName.id : columnId,
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setToDoData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDueDateChange = (date: Date | null) => {
    setToDoData((prev) => ({
      ...prev,
      dueDate: date,
    }));
  };

  const handleAssigneeUserChange = (userId: number | string) =>
    setAssigneeUser({ ...assigneeUser, id: userId });

  const handleColumnChange = (id: number | string) => setColumnName({ ...columnName, id });

  const handleTagsChange = (tags: string[]) => setTags(tags);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];

    try {
      const data = await postDashboardCardImage(columnId, file);

      setToDoData((prev) => ({
        ...prev,
        imageUrl: data.imageUrl,
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const isFormComplete = checkAllFormComplete(data) && tags.length !== 0;

  const handleToDoSubmit = async () => {
    if (!isFormComplete) return;

    try {
      const url: string = card
        ? `${EXTERNAL_API.CARDS.ROOT}/${card.id}`
        : `${EXTERNAL_API.CARDS.ROOT}`;
      const method = card ? api.put<{ columnId: number }> : api.post;

      await method(url, {
        ...data,
        tags,
        imageUrl: toDoData.imageUrl ?? DEFAULT_CARD_IMAGE,
      });

      setToDoData(INITIAL_TO_DO_VALUE);
      setTags([]);

      onClose();
      getCards();
    } catch (err) {
      console.error(err);
    }
  };

  return {
    toDoData,
    dueDate: toDoData.dueDate,
    image: toDoData.imageUrl,
    isFormComplete,
    handleFormChange,
    handleAssigneeUserChange,
    handleColumnChange,
    handleImageChange,
    handleDueDateChange,
    handleTagsChange,
    handleToDoSubmit,
  };
}
