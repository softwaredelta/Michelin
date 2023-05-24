import AnsButtons from "./AnsButtons";

const TourQuestion = () => {
  const content = (
    <>
      <div className="flex flex-col">
        <div className="dark:text-white italic text-xl text-justify p-5 break-words">
          Pregunta muy larga que aqui iría jijijajaj mucho texto vamos a
          cambiarle el tamaño
        </div>
        <div>
          <AnsButtons />
        </div>
      </div>
    </>
  );
  return content;
};
export default TourQuestion;

// const TourQuestion = () => {
//   const content = (
//     <>
//       <Accordion collapseAll alwaysOpen>
//         <AccordionPanel>
//           <AccordionTitle>
//             <AreaTitle />
//           </AccordionTitle>
//           <AccordionContent className='text-center'>
//             <p className='dark:text-white italic text-2xl text-center'> Pregunta muy larga que aqui iría jijijajaj mucho texto vamos a cambiarle el tamaño </p>
//             <AnsButtons />
//           </AccordionContent>
//         </AccordionPanel>
//       </Accordion>
//     </>
//   )
//   return content
// }
// export default TourQuestion
