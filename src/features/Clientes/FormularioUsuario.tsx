// import React, { useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { useCrearCliente, useActualizarCliente } from '../../services/clientesServices'; // Hooks para crear y actualizar clientes
// import BuscarComercioSelect from '../../shared/components/BuscarComercioSelect';
// import { Cliente } from '../../shared/types/clienteInterface';
// import { clienteSchema } from '../../shared/schemas/clienteSchema';

// interface FormularioClienteProps {
//     cliente?: Cliente; // Cliente opcional para editar
// }

// type ClienteFormData = z.infer<typeof clienteSchema>;

// const FormularioCliente: React.FC<FormularioClienteProps> = ({ cliente }) => {
//     const { mutate: crearCliente, isPending: isCreating, isError: isErrorCreating, error: errorCreating } = useCrearCliente();
//     const { mutate: actualizarCliente, isPending: isUpdating, isError: isErrorUpdating, error: errorUpdating } = useActualizarCliente();
//     const { data: roles, isLoading } = useRolesCliente(); // Obtenemos los roles de los clientes
//     const [comercioId, setComercioId] = useState<number | null>(null);
//     const [comercioError, setComercioError] = useState('');

//     // Hook de react-hook-form con validaciones usando Zod
//     const { register, handleSubmit, formState: { errors }, reset } = useForm<ClienteFormData>({
//         resolver: zodResolver(clienteSchema),
//         defaultValues: cliente // Directamente tomamos los datos del cliente para pre-cargar el formulario
//     });

//     useEffect(() => {
//         if (cliente) {
//             reset(cliente); // Resetear los valores del formulario cuando el `cliente` cambia
//         }
//     }, [cliente, reset]);

//     const onSubmit = (data: ClienteFormData) => {
//         const payload = {
//             ...data,
//             ...(comercioId && { comercio_id: comercioId }), // ⬅️ Solo si hay comercio
//         };

//         if (!comercioId) {
//             setComercioError('Debes seleccionar un comercio');
//             return;
//         }

//         if (cliente?.id) {
//             actualizarCliente({ ...payload, id: cliente.id });
//         } else {
//             crearCliente(payload);
//         }
//     };

//     if (isLoading) {
//         return <div>Cargando roles...</div>;
//     }

//     const handleComercioSelect = (id: number | null, comercio?: any) => {
//         setComercioId(id);
//         console.log('Comercio seleccionado:', comercio);
//     };

//     return (
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 bg-white">
//             <div>
//                 <label>Nombre</label>
//                 <input
//                     {...register('nombre')}
//                     className="input input-bordered w-full"
//                     placeholder="Nombre completo"
//                 />
//                 {errors.nombre && <p className="text-red-500">{errors.nombre.message}</p>}
//             </div>

//             <div>
//                 <label>Email</label>
//                 <input
//                     {...register('email')}
//                     type="email"
//                     className="input input-bordered w-full"
//                     placeholder="Email"
//                 />
//                 {errors.email && <p className="text-red-500">{errors.email.message}</p>}
//             </div>

//             <div>
//                 <label>Contraseña</label>
//                 <input
//                     {...register('password')}
//                     type="password"
//                     className="input input-bordered w-full"
//                     placeholder="Contraseña"
//                 />
//                 {errors.password && <p className="text-red-500">{errors.password.message}</p>}
//             </div>

//             <div>
//                 <label>Rol</label>
//                 <select {...register('rol')} className="select select-bordered w-full">
//                     {roles?.map(role => (
//                         <option key={role.id} value={role.nombre}>
//                             {role.nombre}
//                         </option>
//                     ))}
//                 </select>
//                 {errors.rol && <p className="text-red-500">{errors.rol.message}</p>}
//             </div>

//             {cliente?.id && (
//                 <div>
//                     <label>Estado</label>
//                     <select {...register('estado')} className="select select-bordered w-full">
//                         <option value="activo">Activo</option>
//                         <option value="inactivo">Inactivo</option>
//                     </select>
//                     {errors.estado && <p className="text-red-500">{errors.estado.message}</p>}
//                 </div>
//             )}

//             {/* Nuevos campos: Telefono y Dirección */}
//             <div>
//                 <label>Teléfono</label>
//                 <input
//                     {...register('telefono')}
//                     className="input input-bordered w-full"
//                     placeholder="Teléfono"
//                 />
//                 {errors.telefono && <p className="text-red-500">{errors.telefono.message}</p>}
//             </div>

//             <div>
//                 <label>Dirección</label>
//                 <input
//                     {...register('direccion')}
//                     className="input input-bordered w-full"
//                     placeholder="Dirección"
//                 />
//                 {errors.direccion && <p className="text-red-500">{errors.direccion.message}</p>}
//             </div>

//             <BuscarComercioSelect onSelect={handleComercioSelect} />
//             {comercioError && <p className="text-red-500">{comercioError}</p>}

//             <div className="flex justify-end">
//                 <button
//                     type="submit"
//                     className="btn btn-success"
//                     disabled={isCreating || isUpdating}
//                 >
//                     {isCreating || isUpdating ? 'Procesando...' : cliente?.id ? 'Actualizar Cliente' : 'Registrar Cliente'}
//                 </button>
//             </div>

//             {(isErrorCreating || isErrorUpdating) && (
//                 <p className="text-red-500 mt-4">
//                     {(errorCreating || errorUpdating)?.message}
//                 </p>
//             )}
//         </form>
//     );
// };

// export default FormularioCliente;
