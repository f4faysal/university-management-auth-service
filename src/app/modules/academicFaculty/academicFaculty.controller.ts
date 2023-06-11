// import { Request, Response } from 'express';
// import httpStatus from 'http-status';
// import { paginationFields } from '../../../constants/paginatios pagination';
// import catchAsync from '../../../share/catchAsync';
// import pick from '../../../share/pick';
// import sendResponse, {
//   default as sendResponce,
// } from '../../../share/sendReponse';
// import { academicFacultyFilterableFields } from './academicFaculty.constant';
// import { IAcademicFaculty } from './academicFaculty.interface';
// import { AcademicFacultyService } from './academicFaculty.service';

// const createFaculty = catchAsync(async (req: Request, res: Response) => {
//   const { ...academicFacultyData } = req.body;
//   const result = await AcademicFacultyService.createFaculty(
//     academicFacultyData
//   );
//   sendResponce(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Academic Faculty is created successfully !',
//     data: result,
//   });
// });

// const getAllFaculty = catchAsync(async (req: Request, res: Response) => {
//   const filters = pick(req.query, academicFacultyFilterableFields);
//   const paginationOptions = pick(req.query, paginationFields);

//   const result = await AcademicFacultyService.getAllFaculty(
//     filters,
//     paginationOptions
//   );
//   sendResponse<IAcademicFaculty[]>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Faculty retrieved successfully !',
//     meta: result.meta,
//     data: result.data,
//   });
// });

// const getSingelFaculty = catchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id;
//   const result = await AcademicFacultyService.getSingelFaculty(id);
//   sendResponce<IAcademicFaculty>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Get Single Faculty successfully !',
//     data: result,
//   });
// });

// const updateFaculty = catchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id;
//   const updateData = req.body;
//   const result = await AcademicFacultyService.updateFaculty(id, updateData);
//   sendResponce(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Academic Faculty Updated successfully !',
//     data: result,
//   });
// });

// const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id;
//   const result = await AcademicFacultyService.deleteFaculty(id);
//   sendResponce(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Faculty delete successfully !',
//     data: result,
//   });
// });

// export const AcademicFacultyController = {
//   createFaculty,
//   deleteFaculty,
//   updateFaculty,
//   getAllFaculty,
//   getSingelFaculty,
// };

import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { academicFacultyFilterableFields } from './academicFaculty.constants';
import { IAcademicFaculty } from './academicFaculty.interfaces';
import { AcademicFacultyService } from './academicFaculty.service';

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { ...academicFacultyData } = req.body;
  const result = await AcademicFacultyService.createFaculty(
    academicFacultyData
  );
  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty created successfully',
    data: result,
  });
});

const getAllFaculties = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicFacultyFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await AcademicFacultyService.getAllFaculties(
    filters,
    paginationOptions
  );

  sendResponse<IAcademicFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculties retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AcademicFacultyService.getSingleFaculty(id);

  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty fetched successfully',
    data: result,
  });
});

const updateFaculty = catchAsync(
  catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedData = req.body;
    const result = await AcademicFacultyService.updateFaculty(id, updatedData);

    sendResponse<IAcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty updated successfully',
      data: result,
    });
  })
);

const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AcademicFacultyService.deleteByIdFromDB(id);

  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty deleted successfully',
    data: result,
  });
});

export const AcademicFacultyController = {
  createFaculty,
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
