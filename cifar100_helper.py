"""This code is highly adapted from https://github.com/chenyaofo/image-classification-codebase/blob/master/codebase/data/cifar.py
with some light modifications, mostly adding a default value for mean/std.
"""

import torch.utils.data as data
import torchvision.transforms as T
from torchvision.datasets import CIFAR10, CIFAR100
from torch.utils.data.distributed import DistributedSampler

# These were obtained from the same values used to train our original pretrained model:
# https://github.com/chenyaofo/image-classification-codebase/blob/master/conf/cifar100.conf
MEAN = [0.5070, 0.4865, 0.4409]
STD = [0.2673, 0.2564, 0.2761]

# from codebase.torchutils.distributed import is_dist_avail_and_init
def is_dist_avail_and_init():
    return False

def get_vit_train_transforms(mean, std, img_size):
    return T.Compose([
        T.RandomResizedCrop((img_size, img_size), scale=(0.05, 1.0)),
        T.ToTensor(),
        T.Normalize(mean=MEAN, std=STD)
    ])


def get_vit_val_transforms(mean, std, img_size):
    return T.Compose([
        T.Resize((img_size, img_size)),
        T.ToTensor(),
        T.Normalize(mean=MEAN, std=STD)
    ])


def get_samplers(trainset, valset):
    if is_dist_avail_and_init():
        train_sampler = DistributedSampler(trainset)
        val_sampler = DistributedSampler(valset, shuffle=False)
    else:
        train_sampler = None
        val_sampler = None
    return train_sampler, val_sampler

def _cifar(root, image_size, mean, std, batch_size, num_workers, is_vit, dataset_builder, **kwargs):
    if is_vit:
        train_transforms = get_vit_train_transforms(mean, std, image_size)
        val_transforms = get_vit_val_transforms(mean, std, image_size)
    else:
        train_transforms = get_train_transforms(mean, std)
        val_transforms = get_train_transforms(mean, std)

    trainset = dataset_builder(root, train=True, transform=train_transforms, download=True)
    valset = dataset_builder(root, train=False, transform=val_transforms, download=True)

    train_sampler, val_sampler = get_samplers(trainset, valset)

    train_loader = data.DataLoader(trainset, batch_size=batch_size,
                                   shuffle=(train_sampler is None),
                                   sampler=train_sampler,
                                   num_workers=num_workers,
                                   persistent_workers=True)
    val_loader = data.DataLoader(valset, batch_size=batch_size,
                                 shuffle=(val_sampler is None),
                                 sampler=val_sampler,
                                 num_workers=num_workers,
                                 persistent_workers=True)

    return train_loader, val_loader

def cifar100(root, image_size, mean, std, batch_size, num_workers, is_vit, **kwargs):
    return _cifar(
        root, image_size, mean, std, batch_size, num_workers, is_vit, CIFAR100, **kwargs
    )
