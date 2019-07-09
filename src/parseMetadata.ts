// tslint:disable:no-submodule-imports
import * as _ from 'lodash'
import {
  MetadataArgsStorage,
  RoutingControllersOptions
} from '@flyacts/routing-controllers'
import { ActionMetadataArgs } from '@flyacts/routing-controllers/dist/metadata/args/ActionMetadataArgs'
import { ControllerMetadataArgs } from '@flyacts/routing-controllers/dist/metadata/args/ControllerMetadataArgs'
import { ParamMetadataArgs } from '@flyacts/routing-controllers/dist/metadata/args/ParamMetadataArgs'
import { ResponseHandlerMetadataArgs } from '@flyacts/routing-controllers/dist/metadata/args/ResponseHandleMetadataArgs'

/**
 * All the context for a single route.
 */
export interface IRoute {
  readonly action: ActionMetadataArgs
  readonly controller: ControllerMetadataArgs
  readonly options: RoutingControllersOptions
  readonly params: ParamMetadataArgs[]
  readonly responseHandlers: ResponseHandlerMetadataArgs[]
}

/**
 * Parse routing-controllers metadata into an IRoute objects array.
 */
export function parseRoutes(
  storage: MetadataArgsStorage,
  options: RoutingControllersOptions = {}
): IRoute[] {
  return storage.actions.map(action => ({
    action,
    controller: _.find(storage.controllers, {
      target: action.target
    }) as ControllerMetadataArgs,
    options,
    params: _.sortBy(
      storage.filterParamsWithTargetAndMethod(action.target, action.method),
      'index'
    ),
    responseHandlers: storage.filterResponseHandlersWithTargetAndMethod(
      action.target,
      action.method
    )
  }))
}
