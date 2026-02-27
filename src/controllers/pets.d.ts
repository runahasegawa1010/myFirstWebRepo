import type { Request, Response } from "express";
export declare function health(_req: Request, res: Response): void;
export declare function createPet(req: Request, res: Response): Response<any, Record<string, any>>;
export declare function listPets(req: Request, res: Response): void;
export declare function getPet(req: Request, res: Response): Response<any, Record<string, any>> | undefined;
export declare function updatePet(req: Request, res: Response): Response<any, Record<string, any>> | undefined;
export declare function deletePet(req: Request, res: Response): Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=pets.d.ts.map