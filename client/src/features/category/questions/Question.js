import { Checkbox } from "flowbite-react";
import { TableRow } from "flowbite-react/lib/esm/components/Table/TableRow";
import { TableCell } from "flowbite-react/lib/esm/components/Table/TableCell";
import {
  useDeleteQuestionMutation,
  useEditQuestionMutation,
} from "../categoryApiSlice";
import { useEffect, useState } from "react";
import Toast from "../../../components/Toast";
import SvgButton from "../../../components/SvgButton";
import { BsFillTrashFill } from "react-icons/bs";
import ConfirmationModal from "../../../components/ConfirmationModal";

const Question = ({
  triggerEdit,
  idQuestion,
  qOrder,
  qText,
  camera,
  btnNaInitial,
  areaTitle,
  idCategory
}) => {
  const [deleteQuestion, {isSuccess: isSuccessDelete}] = useDeleteQuestionMutation();

  const deleteQ = async (idC, idQ, order) => {
    await deleteQuestion([{ idCategory: idC, idQuestion: idQ, order: order }]);
  };

  const confirmationText = '¿Estás seguro que deseas eliminar la pregunta?'

  const [questionText, setQText] = useState(qText);
  const [usingCamera, setUsingCamera] = useState(camera);
  const [btnNa, setBtnNa] = useState(btnNaInitial);
  const [showDelete, setShowDelete] = useState(false);

  const handleSetShowDelete = () => {
    setShowDelete(true);
  };

  const handleCloseDelete = () => {
    setShowDelete(false);
  };

  const [editQuestion, { isSuccess }] = useEditQuestionMutation();

  const onQuestionTextChanged = (e) => setQText(e.target.value);
  const onCameraChanged = (e) => setUsingCamera(e.target.checked);
  const onBtnNaChanged = (e) => setBtnNa(e.target.checked);

  useEffect(() => {
    if (triggerEdit) {
      const onEditQuestionsClicked = async (e) => {
        await editQuestion({
          questionText,
          usingCamera,
          btnNa,
          idQuestion,
        });
      };

      onEditQuestionsClicked();
    }
  }, [triggerEdit, questionText, usingCamera, btnNa, idQuestion, editQuestion]);

  useEffect(() => {
    if (isSuccess) {
      Toast.fire({
        icon: "success",
        title: "Los cambios han sido guardados",
      });
    }
    if (isSuccessDelete) {
      Toast.fire({
        icon: "success",
        title: "La pregunta fue borrada con éxito",
      });
    }
  }, [isSuccess, isSuccessDelete]);

  return (
    <>
      <TableRow key={idQuestion} className="border-b">
        <TableCell className="text-center">{qOrder}</TableCell>
        <TableCell className="text-center">{areaTitle}</TableCell>
        <TableCell className="text-center">
          <input
            type="text"
            value={questionText}
            onChange={onQuestionTextChanged}
          />
        </TableCell>
        <TableCell className="text-center">
          <Checkbox
            className="scale-110"
            value={usingCamera}
            uncheckedvalue={0}
            checked={usingCamera}
            onChange={onCameraChanged}
          />
        </TableCell>
        <TableCell className="text-center">
          <Checkbox
            key={idQuestion}
            className="scale-110"
            value={btnNa}
            uncheckedvalue={0}
            checked={btnNa}
            onChange={onBtnNaChanged}
          />
        </TableCell>
        <TableCell>
          <SvgButton
            svgfile={<BsFillTrashFill color="#1d4089" />}
            method={handleSetShowDelete}
          />
        </TableCell>
      </TableRow>
      <ConfirmationModal show={showDelete} onClose={handleCloseDelete} text={confirmationText} method={()=>deleteQ(idCategory, idQuestion, qOrder)} />
    </>
  );
};

export default Question;
