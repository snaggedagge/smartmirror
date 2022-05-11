package dkarlsso.smartmirror.backend.actions;

import dkarlsso.commons.commandaction.CommandInvoker;
import dkarlsso.smartmirror.backend.model.CommandEnum;

import java.util.Set;

public interface ActionAwareInvoker extends CommandInvoker<CommandEnum> {

    Set<CommandEnum> supports();
}
